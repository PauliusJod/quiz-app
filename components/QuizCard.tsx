import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { Card } from "@/components/ui/card";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { imageMap, fallbackImage } from "./ImagesMap";

type Props = {
  label: string;
  type: string;
  onPress?: () => void;
};

export default function QuizCard({ label, type }: Props) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const imageSource = imageMap[type] ?? fallbackImage;
  return (
    <Pressable
      onPress={() => console.log(label)}
      style={{ borderRadius: 20 }}>
      <ImageBackground
        source={imageSource}
        resizeMode='cover'
        style={styles.boxStyle}>
        <Card style={[styles.none]}>
          {/* { backgroundColor: Colors[colorScheme ?? "light"].boxbackground } */}
          <Text style={[styles.label, { backgroundColor: Colors[colorScheme ?? "light"].overImageBackground }]}>{label}</Text>
        </Card>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
  },

  none: {
    position: "absolute",
    bottom: 0,
    right: 30,
  },
  boxStyle: {
    justifyContent: "center",
    minHeight: 110,
    margin: 10,
    paddingHorizontal: 20,
    overflow: "hidden",
    borderRadius: 40,
  },
});
