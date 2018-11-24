/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const userName = 'jyy';
const PWD = '123';
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputedNum: '',
      inputedPW: null,
    }
  }

  static navigationOptions = ({
    navigation
  }) => ({
    header: null,
  });

  updateNum(newText) {
    this.setState({
      inputedName: newText,
    });
  }

  updatePwd(newText) {
    this.setState({
      inputedPW: newText,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formStyle}>
          <Text style={styles.titleStyle}>账号</Text>
          <TextInput style = {styles.textInputStyle}
            underlineColorAndroid='transparent' 
            placeholder={'请输入用户名'}
            onChangeText = {(newText)=>this.updateNum(newText)}>
          </TextInput>
        </View>
        <View style={styles.formStyle}>
          <Text style={styles.titleStyle}>密码</Text>
          <TextInput style={styles.textInputStyle}
          underlineColorAndroid='transparent'
            placeholder={'请输入密码'}
            secureTextEntry ={true}
            onChangeText = {(newText)=>this.updatePwd(newText)}>
          </TextInput>
        </View>
        <TouchableOpacity onPress ={
          ()=>{
            // if(this.state.inputedName == userName && this.state.inputedPW == PWD){
            this.props.navigation.navigate('Second',
            {user: this.state.inputedName,pwd:this.state.inputedPW})
            // }else{
              // alert("用户名或密码有误")
            // }   
          }
        }>
          <View style = {styles.buttonStyle}>
            <Text style={styles.loginButton}>
            登录
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems:'center',
  },
  formStyle:{
    flexDirection:'row',
    alignItems:'center',
    borderColor:"#F5FCFF",
    borderBottomColor:"#19ad19",
    borderWidth:1,
    width:"90%",
    padding:10
  },
  titleStyle:{
    color:"#000",
    fontSize:22,
  },
  textInputStyle: {
    width:300,
    fontSize: 20,
    marginLeft:50
  },
  textDisplayStyle: {
    width:300,
    fontSize: 20,
    margin: 20,
  },
  buttonStyle: {
    width:500,
    height:50,
    backgroundColor: "#19ad19",
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
    borderRadius:8
  },
  loginButton:{
    color:"white",
    fontSize:24
  }
});
