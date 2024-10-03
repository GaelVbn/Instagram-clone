import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { AdvancedImage, AdvancedVideo } from "cloudinary-react-native";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "@/src/lib/cloudinary";
import { Video, ResizeMode } from "expo-av";
import PostContent from "./PostContent";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";
const photoProfileAnonymous = require("@/assets/pngegg.png");

export default function PostListItem({ post }: { post: any }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeRecord, setLikeRecord] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchLike();
  }, []);

  useEffect(() => {
    if (isLiked) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [isLiked]);

  const fetchLike = async () => {
    const { data } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user?.id)
      .eq("post_id", post.id)
      .select();

    if (data && data.length > 0) {
      setIsLiked(true);
      setLikeRecord(data[0]);
    }
  };

  const saveLike = async () => {
    if (likeRecord) {
      return;
    }
    const { data } = await supabase
      .from("likes")
      .insert([{ user_id: user?.id, post_id: post.id }])
      .select();

    setLikeRecord(data[0]);
  };

  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeRecord?.id);
      if (!error) {
        setLikeRecord(null);
      }
    }
  };

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

      <PostContent post={post} />

      {/* Footer */}
      <View className="flex-row gap-3 p-3">
        <AntDesign
          onPress={() => setIsLiked(!isLiked)}
          name={isLiked ? "heart" : "hearto"}
          size={20}
          color={isLiked ? "crimson" : "black"}
        />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>
    </View>
  );
}
