import { View, Text, Image, useWindowDimensions } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "@/src/lib/cloudinary";
const photoProfileAnonymous = require("@/assets/pngegg.png");

export default function PostListItem({ post }: { post: any }) {
  const { width } = useWindowDimensions();

  // Extraction de l'ID de l'image Cloudinary
  const imageId = post.image.split("/upload/")[1];
  const image = cld.image(imageId);
  image.resize(thumbnail().width(width).height(width));

  // Extraction de l'ID de l'avatar Cloudinary, ou utilisation de l'image locale si indisponible
  const avatarId = post.user.avatar_url?.split("/upload/")[1];
  let avatarImage;

  const avatar = cld.image(
    post.user.avatar_url || "v1727945531/user/pngegg_vtheui.png"
  );
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  );

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="p-3 flex-row items-center gap-2">
        <AdvancedImage
          cldImg={avatar}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-semibold">
          {post.user.username || "New user"}
        </Text>
      </View>

      {/* Image */}
      <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />

      {/* Footer */}
      <View className="flex-row gap-3 p-3">
        <AntDesign name="hearto" size={20} />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>
    </View>
  );
}
