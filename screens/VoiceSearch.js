import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button, View } from "react-native";
import { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import { useNavigation } from "@react-navigation/native";

export default function VoiceSearch() {
  const navi = useNavigation();
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleSearch();
  }, [search]);
  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("en-IN");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
    setSearch(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };
  const handleSearch = () => {
    if (!search == "") {
      navi.navigate("SearchResults", { search });
    }
  };
  return (
    <View style={styles.container}>
      {!started ? (
        <Button title="Start Speech to search" onPress={startSpeechToText} />
      ) : undefined}
      {started ? (
        <Button title="Stop Speech " onPress={stopSpeechToText} />
      ) : undefined}
      <Text> SearchResults:{search}</Text>
      <StatusBar style="auto" />
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
