import React, { Component } from 'react';
import{StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class ContactDetail extends Component<Props> {
  render() {
    const {params}=this.props.navigation.state;
    return (
      <View style={styles.container}>
         <Image style={styles.imageStyle}
           source={{uri:params.icon}}/> 
          <Text style={styles.nameStyle}>
            名称：{params.name}
          </Text>
          <Text style={styles.typeStyle}>
            分组:{params.type}
          </Text>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('chatPage',{name:params.name})}}>
            <View style={styles.buttonStyle}><Text style={styles.sendMsgButton}>发消息</Text></View>
          </TouchableOpacity>
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageStyle:{
    width:300,
    height:300
  },
  nameStyle:{
    fontSize:30
  },
  typeStyle:{
    fontSize:20
  },
 buttonStyle: {
    width:300,
    height:50,
    backgroundColor: "#19ad19",
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
    borderRadius:8
  },
  sendMsgButton:{
    color:"white",
    fontSize:24
  }
});
