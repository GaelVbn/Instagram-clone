import { Text, View, Image, TextInput, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/src/components/Button";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 flex-1">
      {/* AVATAR IMAGE PICKER Profile */}
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          className="w-52 aspect-square mx-auto rounded-full bg-slate-300 "
        />
      ) : (
        <View className=" aspect-square w-52 mx-auto rounded-full bg-slate-300 " />
      )}
      <Text
        onPress={pickImage}
        className="text-blue-500 self-center font-semibold m-5"
      >
        Change
      </Text>

      {/* FORM */}
      <Text className="mb-2 text-gray-500 font-semibold">Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-300 rounded-md p-3"
      />

      {/* BUTTON */}
      <View className="gap-2 mt-auto">
        <Button title="Update Profile" onPress={() => {}} />
        <Button title="Sign out" onPress={() => {}} />
      </View>
    </View>
  );
}
