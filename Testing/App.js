import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import CardFlip from 'react-native-card-flip';

class App extends React.Component {

  constructor(props) {
    super(props); 
    this.EU = "https://iliad-solutions.com/wp-content/uploads/2017/08/EU.jpg";
    this.urls = [
        "https://www.b92.net/news/pics/2021/11/03/1150282853618282ab96d68129964412_w640.jpg", // Srbija
        "https://www.grasmeregingerbread.co.uk/old/wp-content/uploads/french-flag.jpg",
        "https://media.istockphoto.com/vectors/united-kingdom-flag-realistic-waving-union-jack-vector-id1251660737?k=20&m=1251660737&s=612x612&w=0&h=Hd3fVDhA3KUaefIawI9jcyTFL7M_YZwO6wBxTu8bVxE=" // UK
      ]
  }
  // const EU = "https://iliad-solutions.com/wp-content/uploads/2017/08/EU.jpg"
  // const urls = [
  //   "https://www.b92.net/news/pics/2021/11/03/1150282853618282ab96d68129964412_w640.jpg", // Srbija
  //   "https://www.grasmeregingerbread.co.uk/old/wp-content/uploads/french-flag.jpg",
  //   "https://media.istockphoto.com/vectors/united-kingdom-flag-realistic-waving-union-jack-vector-id1251660737?k=20&m=1251660737&s=612x612&w=0&h=Hd3fVDhA3KUaefIawI9jcyTFL7M_YZwO6wBxTu8bVxE=" // UK
  // ]
  // const table = [
  //   [0,1],
  //   [1,2],
  //   [2,0]
  // ]

  // const onClick = (row, col) => () => {
  //   if(table[row][col] === null)
  //   {
  //     this["card" + row + col].jiggle();
  //   }
  //   else
  //   {
  //     this["card" + row + col].flip();
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card1]}
            onPress={() => this.card.flip()}>
            <ImageBackground
              source={{uri: this.EU}}
              style={styles.image}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card2]}
            onPress={() => this.card.flip()}>
            <ImageBackground
              source={{uri: this.urls[0]}}
              style={styles.image}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </CardFlip>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: "50%",
    height: "50%",
 },
  card: {
    width: "100%",
    aspectRatio: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'lime',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
},
});
*/
export default App;