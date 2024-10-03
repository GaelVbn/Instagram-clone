import { Alert, FlatList } from "react-native";
import PostListItem from "@/src/components/PostListItem";
import post from "@/assets/data/posts.json";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error }: any = await supabase
      .from("posts")
      .select("*, user:profiles(*), my_likes:likes(*)")
      // .eq("id", 4)
      .eq("my_likes.user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      Alert.alert("something went wrong");
    }
    console.log(JSON.stringify(data, null, 2));
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
