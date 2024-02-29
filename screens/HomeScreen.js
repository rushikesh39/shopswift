import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  
  const navi = useNavigation();

  const list = [
    {
      id: "0",
      image: "https://www.bhphotovideo.com/images/images2000x2000/amazon_b07f6vm1s3_echo_buds_1512892.jpg",
      name: "Earbuds",
      category:"Earbuds",
    },
    {
      id: "1",
      image:"https://images-na.ssl-images-amazon.com/images/I/615XvGy0XZL._AC_SL1500_.jpg",
      name: "Smart Watch",
      category:"Smart Watch",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Headphone",
      category:"Headphone",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
      category: "Mobile",
    },
    {
      id: "8",
      image:
        "https://m.media-amazon.com/images/I/91R5dLzX8QL._SX679_.jpg",
      name: "Electronics",
      category: "electronics",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
      category:"women's clothing"
    },
    {
      id: "7",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2017/EDITORIAL/SPRING_2/MEN/CLOTHING/SPRING2_M_Clothing_VD_Set1_3._V534219377_.jpg",
      name: "Fashion",
      category:"men's clothing"
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdress] = useState("");
  console.log(selectedAddress);
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const [loading, setLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState([]);

  // loading products from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-app-server-ivo6.onrender.com/api/products"
        );
        setApiProducts(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-app-server-ivo6.onrender.com/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  //  filter deals of the week
  const filteredProducts = apiProducts.filter(
    (product) =>
      // product.title.toLowerCase().includes(search.toLowerCase())
      product.subCategory === "deal of the week"
  );
  const Todaysdeal = apiProducts.filter(
    (product) =>
      // product.title.toLowerCase().includes(search.toLowerCase())
      product.subCategory === "deal of the day"
  );

  const handleSearch = () => {
    if (!search == "") {
      navi.navigate("SearchResults", { search });
    }
  };

  return (
   <>
      <View
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" , height:'100%'}}
          >
            <ActivityIndicator size="large" color="#00CED1" />
          </View>
        ) : (
          <ScrollView>
            <View
              style={{
                backgroundColor: "#00CED1",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 7,
                  gap: 10,
                  backgroundColor: "white",
                  borderRadius: 3,
                  height: 38,
                  flex: 1,
                }}
              >
                <TextInput
                  style={{
                    width: "75%",
                    marginLeft: 15,
                    paddingVertical: 0,
                  }}
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                  placeholder="Search..."
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                  onPress={handleSearch}
                >
                  <AntDesign
                    style={{ paddingLeft: 10 }}
                    name="search1"
                    size={22}
                    color="black"
                  />
                </TouchableOpacity>
              </Pressable>

              <TouchableOpacity
                onPress={() => {
                  navi.navigate("VoiceSearch");
                }}
              >
                <Feather name="mic" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                padding: 10,
                backgroundColor: "#AFEEEE",
              }}
            >
              <Ionicons name="location-outline" size={24} color="black" />

              <Pressable>
                {selectedAddress ? (
                  <Text>
                    Deliver to {selectedAddress?.name} -{" "}
                    {selectedAddress?.street}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                  </Text>
                )}
              </Pressable>

              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {list.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    margin: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navi.navigate("CategoryScreen",{ category: item.category,product:products});
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                    source={{ uri: item.image }}
                  />

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
                    {item?.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <SliderBox
              images={images}
              autoPlay
              circleLoop
              dotColor={"#13274F"}
              inactiveDotColor="#90A4AE"
              ImageComponentStyle={{ width: "100%" }}
            />

            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Trending Deals of the week
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {filteredProducts.map((item, index) => (
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

            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />

            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Today's Deals
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Todaysdeal.map((item, index) => (
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
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />

                  <View
                    style={{
                      backgroundColor: "#E31837",
                      paddingVertical: 5,
                      width: 130,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Upto {item?.offer}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />

            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                width: "45%",
                marginBottom: open ? 50 : 15,
              }}
            >
              <DropDownPicker
                style={{
                  borderColor: "#B7B7B7",
                  height: 30,
                  marginBottom: open ? 120 : 15,
                }}
                open={open}
                value={category} //genderValue
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder="choose category"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onGenderOpen}
                // onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {products
                ?.filter((item) => item.category === category)
                .map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
            </View>
          </ScrollView>
        )}
      </View>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
      
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
