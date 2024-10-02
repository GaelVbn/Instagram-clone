import { FlatList } from "react-native";
import PostListItem from "@/src/components/PostListItem";
import post from "@/assets/data/posts.json";

export default function FeedScreen() {
  return (
    <FlatList
      data={post}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{
        gap: 10,
        maxWidth: 512,
        width: "100%",
        marginHorizontal: "auto",
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
