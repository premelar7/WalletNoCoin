import sharp from "sharp";
async function resizeImage(inputPath: string, outputPath: string) {
    return new Promise(resolve => {

        sharp(inputPath).
            resize(500).
            toFile(outputPath).
            then(() => {
                console.log("Resize the image success.");
                resolve(true)
            }).catch(err => {
                throw new Error(err);
            })
    }

    )

}

export { resizeImage }

