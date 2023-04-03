import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const audios = [
    require("./assets/audios/1.mp3"),
    require("./assets/audios/2.mp3"),
  ];

  const [sound, setSound] = useState();

  const playAudio = async (audio) => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {audios.map((audio, i) => (
        <Button
          title={`Audio #${i + 1}`}
          onPress={(_) => playAudio(audio)}
          key={i}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
