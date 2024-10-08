import { Cloudinary } from "@cloudinary/url-gen";
import {
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";
import { upload } from "cloudinary-react-native";

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    // cloudName: "demo",
  },
});

export const uploadImage = async (file: string) => {
  const options: UploadApiOptions = {
    upload_preset: "Default",
    unsigned: true,
    resource_type: "auto",
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};
