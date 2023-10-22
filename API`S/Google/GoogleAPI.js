import {google} from "googleapis";
import credentials from "./google-credentials.json" assert { type: "json" };
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = credentials;
import * as fs from "fs";

async function uploadFile(drive, file_path)
{
    try {
        const response = await drive.files.create({
            requestBody: {
                name: `${Date.now()}.jpg`, // Use a timestamp as the filename to ensure uniqueness
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(file_path),
            },
        });

        console.log(response.data);
    }
    catch (error)
    {
        console.log(error.message);
    }
}


export async function createAndUploadFile(ctx, tmpFilePath)
{
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client,
    });

    await uploadFile(drive, tmpFilePath) //Change it from user`s photo



}