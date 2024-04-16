import * as fs from 'fs';

async function ensureDirectoryExists(dirPath: string) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        } else {
            console.log(`Directory is exist: ${dirPath}`);
        }
    } catch (error) {
        console.error(`An error occurred while checking or creating the directory: ${error}`);
    }
}


async function deleteDirectory(dir: string) {
    try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`Directory deleted: ${dir}`);
    } catch (error) {
        console.error(`${error}`);
    }
}

export { ensureDirectoryExists, deleteDirectory }