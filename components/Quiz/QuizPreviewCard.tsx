import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/[default_components]/Themed";
import { Card } from "@/components/ui/card";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { imageMap, fallbackImage } from "../utils/ImagesMap";
import { useRouter } from "expo-router";
import { Box } from "../ui/box";

type Props = {
  label: string;
  type: string;
  onPress?: () => void;
};

export default function QuizPreviewCard({ label, type }: Props) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const router = useRouter();
  const imageSource = imageMap[type] ?? fallbackImage;
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/(screens)/QuizScreen", params: { quizCategory: label, quizId: "123" } })}
      style={{ borderRadius: 20 }}>
      <ImageBackground
        source={imageSource}
        resizeMode='cover'
        style={styles.boxStyle}>
        <Box style={[styles.textOverImage, { backgroundColor: Colors[colorScheme ?? "light"].overImageBackground }]}>
          <Text>Score 777</Text>
          <Text>quizzes 5/25</Text>
          <Text>rank</Text>
        </Box>
        <Card style={[styles.none]}>
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
  textOverImage: {
    position: "absolute",
    width: "90%",
    top: 0,
    left: 70, //50
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
