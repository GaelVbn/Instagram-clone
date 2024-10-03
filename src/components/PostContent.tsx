import { useWindowDimensions } from "react-native";
import { cld } from "../lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { ResizeMode, Video } from "expo-av";

export default function PostContent({ post }) {
  const { width } = useWindowDimensions();

  if (post.media_type === "image") {
    const imageId = post.image.split("/upload/")[1];
    const image = cld.image(imageId);
    image.resize(thumbnail().width(width).height(width));

    return <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />;
  }

  if (post.media_type === "video") {
    const videoId = post.image.split("/upload/")[1];
    const video = cld.video(videoId);
    video.resize(scale().width(400));

    return (
      <Video
        className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        source={{
          uri: video.toURL(),
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
      />
    );
  }
}
