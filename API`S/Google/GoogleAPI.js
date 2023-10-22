// Import necessary modules and dependencies
import { google } from "googleapis";
import credentials from "./google-credentials.json" assert { type: "json" };
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = credentials;
import * as fs from "fs";

// Function to upload a file to Google Drive
async function uploadFile(drive, file_path) {
    try {
        // Create a new file on Google Drive with a unique timestamp-based name
        const response = await drive.files.create({
            requestBody: {
                name: `${Date.now()}.jpg`, // Use a timestamp as the filename to ensure uniqueness
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(file_path), // Read the file from the local filesystem
            },
        });

        console.log(response.data); // Log the response data from Google Drive
    }
    catch (error) {
        console.log(error.message); // Handle any errors that occur during the file upload
    }
}

// Function to create and upload a file to Google Drive
export async function createAndUploadFile(ctx, tmpFilePath) {
    // Create a new OAuth2 client using the provided credentials
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    // Set the client's credentials to use the provided refresh token
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Create a Google Drive client with the authenticated OAuth2 client
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client,
    });

    // Call the uploadFile function to upload the file to Google Drive
    await uploadFile(drive, tmpFilePath); // Change it from the user's photo
}
