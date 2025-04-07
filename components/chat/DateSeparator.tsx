import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface DateSeparatorProps {
  date: string;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <>
      <View
        style={[
          {
            backgroundColor: theme.background,
          },
          styles.container,
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme.text,
            },
          ]}
        >
          {date}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    marginVertical: 5,
    fontSize: 12,
    borderRadius: 20,
  },
});
