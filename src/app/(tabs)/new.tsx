import { Text, View, Image, TextInput, Pressable } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";
import { uploadImage } from "@/src/lib/cloudinary";

export default function CreatePost() {
  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // upload images to cloudinary

  const createPost = async () => {
    if (!image) return;
    const response = await uploadImage(image);
    //save the post in database
  };

  return (
    <View className="p-3 items-center flex-1">
      {/* Image */}
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300 "
        />
      ) : (
        <View className="bg-slate-300 w-52 aspect-[3/4] rounded-lg " />
      )}

      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
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
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
