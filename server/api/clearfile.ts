import { deleteDirectory } from "../Module/file"
export default defineEventHandler(async (event) => {
    try {
        await deleteDirectory("./uploads/2024")
        await deleteDirectory("./uploads/sharp/2024")
        await deleteDirectory("./uploads/temp/2024")
        return {
            success: true,
            result: null
        }
    } catch (error) {
        console.error(`An error occurred while checking or creating the directory: ${error}`);
    }
})