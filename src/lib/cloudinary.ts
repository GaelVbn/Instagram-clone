import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: {
    // cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    cloudName: "demo",
  },
});
