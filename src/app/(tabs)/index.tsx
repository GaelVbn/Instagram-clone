import { Alert, FlatList } from "react-native";
import PostListItem from "@/src/components/PostListItem";
import post from "@/assets/data/posts.json";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error }: any = await supabase
      .from("posts")
      .select("*, user:profiles(*)");
    if (error) {
      Alert.alert("something went wrong");
    }
    setPosts(data);
    setLoading(false);
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{
        gap: 10,
        maxWidth: 512,
        width: "100%",
        marginHorizontal: "auto",
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={fetchPosts}
      refreshing={loading}
    />
  );
}
