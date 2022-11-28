import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export const SLIDER_WIDTH = Dimensions.get('window').width + 20
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const CarouselCardItem = ({ item, index }) => {

    var status, color;
    if (item.body == 'Completed') {
        status = "checkcircle";
        color = "#00E545";
    } else {
        status = "closecircle";
        color = "#E90A0A";
    }

    return (
        <View style={styles.container} key={index}>
            <Image
                source={{uri: item.uri}}
                style={styles.image}
            />
            <View
              style={styles.info} 
            >
                <Text style={styles.header}>{item.title}</Text>
                <View style={styles.row}>
                    <MaterialIcons name="circle" size={17} color="#fff" style={{position: 'absolute'}}/>
                    <AntDesign name={status} size={17} color={color} style={{paddingRight: 7}} />
                    <Text style={styles.body}>{item.body}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: 175,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  row: {
    flexDirection: "row",
    justifyContent: 'flex-start'
  },    
  image: {
    width: ITEM_WIDTH,
    height: 175,
    borderRadius: 8,
    position: 'absolute'
  },
  info: {
    backgroundColor: 'rgba(125,125,125,0.7)',
    width: '100%',
    height: 60,
    paddingLeft: 15,
    paddingTop: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  header: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  body: {
    color: "#fff",
    fontSize: 11,
  }
})

export default CarouselCardItem