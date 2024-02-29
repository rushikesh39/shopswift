import React from "react";
import { View, Text, FlatList, Pressable,Image,navigation,navigate } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const CategoryScreen = () => {
  const route = useRoute();
  const { category, product } = route.params;

  console.log("product productproductproductproductproduct",product)
  // console.log("category",category)
  const filteredData = product.filter((item) => item.category === category);
  // console.log("fileter data",filteredData)
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredData && filteredData.map((item, index) => (
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
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 180, height: 180, resizeMode: "contain" }}
              source={{ uri: item?.image }}
            />
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default CategoryScreen;
