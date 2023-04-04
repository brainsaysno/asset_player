import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import { StorageAccessFramework } from "expo-file-system";

export default function App() {
  const [audioUris, setAudioUris] = useState([]);

  const [sound, setSound] = useState();

  const playAudio = async (audioUri) => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
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

  const handlePickDirectory = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const files = await StorageAccessFramework.readDirectoryAsync(
        permissions.directoryUri
      );
      const uris = files.filter((file) => file.endsWith(".mp3"));

      setAudioUris(uris);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Open directory picker"
        onPress={handlePickDirectory}
        color="#D21404"
      />
      <View>
        {audioUris.map((uri, i) => (
          <Button
            title={`Audio #${i + 1}`}
            onPress={(_) => playAudio(uri)}
            key={i}
          />
        ))}
      </View>
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
