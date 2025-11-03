import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

cloudinary.config({
    cloud_name: "second",
    api_key: "596635365531532",
    api_secret: "NnNfqkr113ID9H4fr06gLPaiGCY"
});



const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        })

        console.log("File has been successfully uploaded to cloudinary", response)
        return response;
    } catch (error) {
        fs.unlinkSync(filePath) // removed the locally saved file as the uploadation is failed
        return null;
    }
}

export { uploadOnCloudinary }