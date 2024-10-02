import { Text, View, Image, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function CreatePost() {
  const [caption, setCaption] = useState<string>("");

  return (
    <View className="p-3 items-center flex-1">
      {/* Image */}
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
        }}
        className="w-52 aspect-[3/4] rounded-lg "
      />

      <Text onPress={() => {}} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      {/* Caption */}
      <TextInput
        value={caption}
        onChangeText={(text) => setCaption(text)}
        placeholder="What is on your mind"
        className="w-full p-3"
      />

      {/* Button */}
      <View className="mt-auto w-full">
        <Pressable className="w-full bg-blue-500 p-4 items-center rounded-md">
          <Text className="text-white font-semibold">Share</Text>
        </Pressable>
      </View>
    </View>
  );
}
