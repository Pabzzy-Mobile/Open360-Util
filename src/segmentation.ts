import * as fs from "fs";

/**
 * @param {String} streamKey
 * @return {Promise<void>}
 */
function makeVOD(streamKey: string) : Promise<void>
{
    return new Promise((resolve) => {
        let actualPath = "./video_database/live/" + streamKey;
        let vodPath = "./video_database/video/" + streamKey;
        let dir = fs.readdirSync(actualPath);
        let files = dir.filter((file) => isSegmentFile(file));
        for (let i = 1; i <= files.length; i++) {
            // Get the file and the extension
            let file = files[i - 1].split(".");
            let fileExtension = "." + file[file.length - 1];
            // Make sure the directory exists
            if (!fs.existsSync(vodPath)) fs.mkdirSync(vodPath);
            // Define the source and destination
            let source = actualPath + "/" + files[i - 1];
            let destination = vodPath + "/index" + fileExtension;
            console.log("Making vod from", source, "to", destination);
            // Copy the vod from the live folder to the vod folder
            // WARN This is not working, the destination file does not play
            fs.copyFile(source, destination, (err) => {
                if (err) console.error(err);
                console.log("Done copying vod to", destination);
                // Delete the live file
                fs.unlink(actualPath + "/" + files[i - 1], () => {
                    console.log("Deleted origin vod", source);
                });
                if (i === files.length){
                    resolve();
                }
            });
        }
    });
}

/**
 * @param {String} str
 */
function isSegmentFile(str: string) : boolean
{
    return str.endsWith(".mp4") || str.endsWith(".png")
}

export {
    makeVOD,
    isSegmentFile,
}