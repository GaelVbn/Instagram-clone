import { Text, View, Image, TextInput, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import CustomTextInput from "@/src/components/CustomTextInput";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const { user } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error) {
      Alert.alert("Failed to fetch profile");
    }
    setUsername(data.username);
    setBio(data.bio);
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ username, bio })
      .eq("id", user?.id)
      .select();

    if (error) {
      console.log(error);
      Alert.alert("failed to update profile");
    } else {
      Alert.alert("Your profile is updated !");
    }
  };
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
      <View className="gap-5">
        <CustomTextInput
          label="Username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <CustomTextInput
          label="Bio"
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* BUTTON */}
      <View className="gap-2 mt-auto">
        <Button title="Update Profile" onPress={updateProfile} />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
