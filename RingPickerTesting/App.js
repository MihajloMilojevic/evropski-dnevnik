import CircleList from "react-native-circle-list"
import { Dimensions, Alert, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import star from "./star.png";

function CircleListItem({item}) {
  return (
    <Pressable 
      style={styles.element}
      onPress={() => {
        Alert.alert("" + item.id, "sad predjemo na level " + item.id)
      }}
    >
      <ImageBackground
        source={star} //{uri: "https://www.pngkey.com/png/full/4-44204_png-star-black-and-white-transparent-star-black.png"}
        resizeMode="cover" 
        style={styles.image}
      >
        <Text style={styles.textColor}>{item.value}</Text>
      </ImageBackground>
    </Pressable>
  )
}

export default function App() {

    const keyExtractor = item => Math.round(Math.random() * 10000)
    const renderItem = ({ item }) => <CircleListItem item={item} />

        const data  = [
          {
            id: 1,
            value: 1
          },
          {
            id: 2,
            value: 2
          },
          {
            id: 3,
            value: 3
          },
          {
            id: 4,
            value: 4
          },
          {
            id: 5,
            value: 5
          },
          {
            id: 6,
            value: 6
          },
          {
            id: 7,
            value: 7
          },
          {
            id: 8,
            value: 8
          },
          {
            id: 9,
            value: 9
          }
        ]

        return (
            <View style={styles.container}>
              <CircleList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                visiblityPadding={2}
                elementCount={data.length}
            />
            </View>
        )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  element: {
    //backgroundColor: "#6da0ed",
    //borderRadius: 30,
    aspectRatio: 1,
    color: "white",
    width: 80
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  textColor: {
    color: "white"
  }
});
