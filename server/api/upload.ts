import { writeFile } from "fs/promises"
import * as fs from 'fs';
import dayjs from 'dayjs';

export default defineEventHandler(async (event) => {

    const formData: any = await readMultipartFormData(event)
    const file = formData.find((item: any) => item.name == 'file')

    const now = dayjs();
    const Dirpath = './uploads/' + now.format('YYYY/MM/DD')
    ensureDirectoryExists(Dirpath);

    const path = Dirpath + '/' + file.filename

    await writeFile(path, file.data)
    return {
        message: path
    }
})

/**
 * Ensures that a directory exists.
 * If the directory structure does not exist, it is created.
 *
 * @param dirPath - The path of the directory to check or create.
 * @returns true if the directory existed or was successfully created, false otherwise.
 */
function ensureDirectoryExists(dirPath: string): boolean {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        } else {
            console.log(`Directory already exists: ${dirPath}`);
        }
        return true;
    } catch (error) {
        console.error(`An error occurred while checking or creating the directory: ${error}`);
        return false;
    }
}
