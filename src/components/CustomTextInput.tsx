import { Text, TextInput, TextInputProps, View } from "react-native";
import { FC } from "react";

interface CustomTextInputProps extends TextInputProps {
  label: string;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  label,
  ...textInputProps
}) => {
  return (
    <View>
      <Text className="mb-2 text-gray-500 font-semibold">{label}</Text>
      <TextInput
        {...textInputProps}
        className="border border-gray-300 rounded-md p-3"
      />
    </View>
  );
};

export default CustomTextInput;
