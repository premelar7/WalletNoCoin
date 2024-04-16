import Tesseract from "tesseract.js"

async function textRecognition(pathImage: string) {
    const result = await Tesseract.recognize(
        pathImage,
        'tha', // Specify the language here
        {
            logger: (m) => console.log(m), // Logs progress
        }
    )
    return result.data.text
}

export { textRecognition }