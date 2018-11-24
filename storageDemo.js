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
  AsyncStorage,
} from 'react-native';



type Props = {};
export default class storageDemo extends Component<Props> {

  constructor(props) {
      super(props);
      this.state = {
          insertKey: "", //用于保存用户输入要插入的key
          insertValue: "", //用于保存用户输入要插入的value
          queryKey: "", //用于保存用户输入的要查询的key
          queryValue: "", //用于根据queryKey，查询到的持久化value值
          inputKey: "" //用于保存用于输入的key，可用于查询、删除
      }
  }
  /*举例如何更新一个state值、其余的请自行实现*/

  updateInsertValue(input) {
      this.setState({
          insertValue: input
      })
  }
  //添加数据
  addData(insertValue, insertKey) {
      AsyncStorage.setItem(this.state.insertKey, this.state.insertValue, (error) => {
          if (error) {
              alert("添加失败")
          } else {
              alert("添加成功，key:" + this.state.insertKey)
          }
      })
  }
  //根据输入的key查询
  queryItemByKey() {
      AsyncStorage.getItem(this.state.inputKey, (error, result) => {
          if (error) {
              alert("查询失败");
          } else {
              alert("查询成功");
              this.setState({
                  queryValue: result
              })
          }
      })
  }
  //根据key删除对应的value
  deleteItemByID() {
      AsyncStorage.removeItem(this.state.inputKey, (error => {
          if (error) {
              alert("删除失败")
          } else {
              alert("删除成功")
          }
      }))
  }

  //清空数据
  clearAllItem() {
      AsyncStorage.clear((error) => {
          if (error) {
              alert("清空失败")
          } else {
              alert("清空成功")
          }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.up}>
          <View style={styles.horizonItem}>
            <Text style={styles.textStyle}>
            key:
            </Text>
            <TextInput style={styles.inputStyle}
              onChangeText = {
                  (text => {
                      this.setState({
                          insertKey: text
                      })
                  })
              } >
            </TextInput>
          </View>
          <View style={styles.horizonItem}>
            <Text style={styles.textStyle}>
            value:
            </Text>
            <TextInput style={styles.inputStyle}
              onChangeText = {
                  (text) => {
                      this.setState({
                          insertValue: text
                      })
                  }
              } >
            </TextInput>
          </View>
          <Text style = {styles.buttonStyle}
            onPress = {this.addData.bind(this)}>
            添加
          </Text>
        </View>

        <View style={styles.down}>
        <View style={styles.horizonItem}> 
          <Text  style={styles.textStyle}>
            key:
          </Text>
          <TextInput style={styles.inputStyle}
            onChangeText={(text) => {
                this.setState({
                    inputKey : text
                })
            }}>     
          </TextInput>
        </View> 

        <View style={styles.horizonItem}> 
          <Text  style={styles.textStyle}>
            value:
          </Text>
          <Text style={styles.inputStyle}>
            {this.state.queryValue}
          </Text>
        </View> 

        <View style={styles.buttonSet}>
          <Text style = {styles.buttonStyle}
            onPress={this.queryItemByKey.bind(this)}>
            查询
          </Text>
          <Text style = {styles.buttonStyle}
            onPress={this.clearAllItem.bind(this)}>
            清空value
          </Text>
        </View>

        <View style={styles.buttonSet}>
          <Text style = {styles.buttonStyle}
            onPress={this.deleteItemByID.bind(this)}>
            删除
          </Text>
          <Text style = {styles.buttonStyle}
           onPress={this.clearAllItem.bind(this)}>
            清空数据
          </Text>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  up: {
    flex:1,
    backgroundColor:"#E6E6FA",
  },
  down:{
    flex:1,
    backgroundColor:"#B0C4DE",
  },

  horizonItem:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    //backgroundColor:'skyblue',
  },

  inputStyle:{
    flex:1,
    marginRight:10,
    color:'white',
    fontSize:30,
  },
  textStyle:{
    backgroundColor:'gray',
    color:'#fff',
    fontSize:20,
    margin:5,
    padding:5,
  },

  textvalueStyle:{
    flex:1,
    marginRight:10,
    color:'white',
    fontSize:30,
    backgroundColor:'gray',
    textDecorationLine:"underline",
  },
  buttonStyle:{
    backgroundColor:'gray',
    color:'white',
    textAlign:'center',
    fontSize:30,
    margin:20,
  },

  buttonSet:{
    flexDirection:'row',
    flexWrap:'nowrap'
  }
});
