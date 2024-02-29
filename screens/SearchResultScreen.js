import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";

const SearchResultsScreen = ({ route, navigation }) => {
  const { search } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-app-server-ivo6.onrender.com/api/search?term=${search}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <SafeAreaView
      style={{
        // paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Search Results for: {search}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#00CED1" />
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent:'center',
                flexWrap: "wrap",
              }}
            >
              {searchResults.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Info", {
                      id: item.id,
                      title: item.title,
                      price: item?.price,
                      carouselImages: item.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      item: item,
                    })
                  }
                  style={{
                    marginVertical: 10,
                    alignItems: "center",
                    borderBottomWidth: 0.5,
                    maxWidth: 300,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    paddingBottom:20,
                    alignSelf:"center",
                   
                  }}
                >
                  <Image
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: "contain",
                    
                    }}
                    source={{ uri: item?.image }}
                  />
                  <View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize:16,
                        fontWeight:'600'
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    paddingBottom: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default SearchResultsScreen;
