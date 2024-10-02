import { Pressable, Text } from "react-native";

type ButtonPorps = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: ButtonPorps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full bg-blue-500 p-4 items-center rounded-md"
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
