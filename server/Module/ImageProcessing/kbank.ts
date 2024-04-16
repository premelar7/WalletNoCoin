import sharp from "sharp";

async function KbankAmountSharp(inputPath: string, outputPath: string) {
    return new Promise(resolve => {
        sharp(inputPath).
            extract({ left: 30, top: 439, width: 250, height: 27 }).
            toFile(outputPath).
            then(() => {
                console.log("Kbank Money : Sharped the image success.");
                resolve(true)
            }).catch(err => {
                console.log("Kbank Money : Sharped the image fail.");
                throw new Error(err);
            })
    })

}

async function KbankDateSharp(inputPath: string, outputPath: string) {
    return new Promise(resolve => {
        sharp(inputPath).
            extract({ left: 21, top: 37, width: 176, height: 28 }).
            toFile(outputPath).
            then(() => {
                console.log("Kbank Date : Sharped the image success.");
                resolve(true)
            }).catch(err => {
                console.log("Kbank Date : Sharped the image fail.");
                throw new Error(err);
            })
    })

}

export { KbankAmountSharp, KbankDateSharp }