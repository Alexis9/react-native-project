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


type Props = {};
export default class secondPage extends Component<Props> {

  constructor(props){
    super(props);

  }
  static navigationOptions = ({navigation}) => ({
    headerTitle: `${navigation.state.params.user} Login`,
  });

  onPress(){
    this.props.navigation.goBack();  
  }

  render() {
    const {params}=this.props.navigation.state;
    return (
      <View style={styles.container}>

        <Text style = {styles.textDisplayStyle}>
			  登陆的用户名是：{params.user}
        </Text>

        <Text style = {styles.textDisplayStyle}>
			  登陆的密码是：{params.pwd}
        </Text>
        <TouchableOpacity onPress ={this.onPress.bind(this)}>
          <Text style = {styles.buttonStyle}>
			      返回
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputStyle:{
    backgroundColor:'gray',
    fontSize:20,
    margin:20,
  },
  textDisplayStyle:{
    fontSize:20,
    margin:20,
  },
  buttonStyle:{
    backgroundColor:'gray',
    color:'white',
    textAlign:'center',
    fontSize:30,
    margin:20,
  }
});
