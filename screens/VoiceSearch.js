import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Voice from "@react-native-voice/voice";
import { useNavigation } from "@react-navigation/native";

export default function VoiceSearch() {
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

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
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
    setSearch(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  const onSpeechEnd = () => {
    setStarted(false);
  };

  const handleSearch = () => {
    if (search !== "") {
      navigation.navigate("SearchResults", { search });
    }
  };

  return (
    <View style={styles.container}>
      {!started ? (
        <TouchableOpacity onPress={startSpeechToText}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/8368/8368666.png" }}
            style={styles.image}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={stopSpeechToText}>
          <Image
            source={{ uri: "https://media.tenor.com/images/7654269dc96ba529876f98fc85181f55/tenor.gif" }}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
