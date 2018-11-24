/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
      show : false
    }
  }

  sendMsg = ()=>{
    this.setState({
      msg:<View>
                {this.state.msg}
                <View style={styles.chatBox}>
                  <View style={styles.chatText}>
                    <Text
                        style={styles.textStyle}
                    >{this.state.textValue}</Text>
                  </View>
                  <View style={styles.headImg}>
                    <Image style={styles.headImgStyle}
                        source={require('./image/image1.png')}></Image>
                  </View>
                </View>
          </View>
    });
    this.setState((previousState) => {
      return({
        show:!previousState.show
      })
    })
  }

  render() {
    const {params}=this.props.navigation.state;
    return (
        <View style={styles.container}>
          <View style={styles.topStyle}>
            <Text style={styles.textStyle}>{params.name}</Text>
          </View>
          <View style={styles.chatPage}>
            <ScrollView>
             {this.state.msg}
            </ScrollView>
          </View>
          
          <View style={styles.inputBox}>
            <View style={styles.textInput}>
              <View style={styles.textInput} >
                <TextInput
                  multiline={true}
                  underlineColorAndroid={"transparent"}
                  onChangeText={(text) => {
                    this.setState({
                      textValue: text
                    })
                  }}
                />
              </View>
            </View>
            <View style={styles.sendButton}>
                <TouchableOpacity onPress={()=>{
                  this.sendMsg()
                  }}>
                    <Text>发送</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: "flex",
    flexDirection: 'column',
    backgroundColor: "#eef2f5"
  },
  topStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#222126",
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatPage: {
    flex: 9,
    width: "100%",
    backgroundColor: "#eef2f5"
  },
  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginTop:10,
    marginBottom:10,
    justifyContent:"center"
  },
  headImgStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatText: {
    height: 70,
    width: "70%",
    width: "60%",
    borderRadius: 5,
    marginLeft: 90,
    marginRight: 20,
    backgroundColor: "#222126",
  },
  textStyle: {
    padding: 10,
    color: "#dcb86c",
    fontSize: 18,
    position: 'absolute'
  },
  inputBox: {
    display: "flex",
    alignItems: 'center',
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderRadius: 5,
    height: 40,
    width: "80%",
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#dcb86c",
    height: 40,
    width: 50,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

