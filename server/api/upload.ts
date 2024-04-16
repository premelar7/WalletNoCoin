import { writeFile } from "fs/promises"
import dayjs from 'dayjs';
import crypto from "crypto"
import { reverseDatetime, validateDay, validateYears, validateTime } from "../Module/datetime"
import { textRecognition } from "../Module/text.recognition"
import { KbankDateSharp, KbankAmountSharp } from "../Module/ImageProcessing/kbank"
import { resizeImage } from "../Module/ImageProcessing/index"
import { ensureDirectoryExists } from "../Module/file"
const thaiMonthNames = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
];

export default defineEventHandler(async (event) => {
    try {
        const formData: any = await readMultipartFormData(event)
        const file = formData.find((item: any) => item.name == 'file')

        const now = dayjs().format('YYYY/MM/DD/');

        const Dirpath = './uploads/temp/' + now
        const resizePath = './uploads/' + now
        const sharpPath = './uploads/sharp/' + now

        const fileExt = file.filename.substr(file.filename.lastIndexOf("."))

        await ensureDirectoryExists(Dirpath);
        await ensureDirectoryExists(resizePath);
        await ensureDirectoryExists(sharpPath);

        const fileName = crypto.randomBytes(8).toString('hex') + fileExt;
        const path = Dirpath + fileName

        await writeFile(path, file.data)

        const resizePathFile = resizePath + fileName
        const sharpPathFile_DATE = sharpPath + "date_" + fileName
        const resizing = await resizeImage(path, resizePathFile)
        let result = null
        if (resizing) {
            result = await kbankPayload(sharpPathFile_DATE, resizePathFile)
            // console.table(kbank);
            
            // await KbankAmountSharp(resizePath + fileName, sharpPath + "amount_" + fileName)           
        }
        let reader = {}

        return result
    } catch (error) {
        console.error(`An error occurred while checking or creating the directory: ${error}`);
        return {
            message: error
        };
    }
})

async function kbankPayload(sharpPathFile_DATE: string, resizePathFile: string) {

    let payload = {
        success: false,
        dateTime: "",
        amount: 0
    }
    const cutSuccess = await KbankDateSharp(resizePathFile, sharpPathFile_DATE)
    if (cutSuccess) {
        const resultDate = await textRecognition(sharpPathFile_DATE)
        let [day, monthAbbr, year, time] = resultDate.split(" ")
        if (validateDay(day) && thaiMonthNames.includes(monthAbbr) && validateYears(year) && validateTime(time)) {
            payload.success = true
            payload.dateTime = reverseDatetime(day, thaiMonthNames.indexOf(monthAbbr) + 1, year, time);
            const sharpPathFile_AMOUNT = sharpPathFile_DATE.replace("date_", "amount_")
            await KbankAmountSharp(resizePathFile, sharpPathFile_AMOUNT)
            const resultAmount = await textRecognition(sharpPathFile_AMOUNT)
            payload.amount = parseFloat(resultAmount)
        }
    }
    return payload
}

