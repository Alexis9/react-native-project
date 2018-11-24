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
  ListView,
  Image,
  TouchableOpacity 
} from 'react-native';

import jsonData from './sectionData.json'
import {StackNavigator} from 'react-navigation';

type Props = {};
export default class ContactList extends Component < Props > {
    navigation = null;
    constructor(props) {
      super(props);
      navigation = this.props.navigation
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2,
        sectionHeaderHasChanged: (s1, s2) => s1 != s2,
      });
      this.state = {
        dataSource: ds.cloneWithRowsAndSections(jsonData)
      }
    }
  componentDidMount() {
    fetch('http://212.64.25.41:8080/listview/sectionData.json')
      .then(Response => Response.json())
      .then(responseData => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 != r2,
          sectionHeaderHasChanged: (s1, s2) => s1 != s2,
        });
        this.setState({
          dataSource: ds.cloneWithRowsAndSections(responseData)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  _renderRow(rowData) {
    return (
      <TouchableOpacity onPress={
        () => {
          navigation.navigate('third',
          {icon:rowData.icon,name:rowData.name,type:rowData.type})
        }
      }>
        <View style={styles.Contact}>
          <Image source={{uri:rowData.icon}} style={styles.ContactIcon}/>
          <View style={styles.ContactMsg}>
            <Text style={styles.ContactName}>{rowData.name}</Text>
            <Text style={styles.ContactType}>{rowData.type}</Text>
          </View>   
        </View>
        </TouchableOpacity>
    )
  }
  _renderHeader(sectionData,sectionId){
      return (
        <View style={styles.sectionHeaderViewStyle}>
            <Text style={styles.IndexStyle}>{sectionId}</Text>
        </View>
        )
  }

    render() {
      return (
        <View style={styles.container}>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow={this._renderRow}
            renderSectionHeader={this._renderHeader}
          />
        </View>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  Contact: {
    flexDirection: "row",
    padding: 10,
  },
  ContactMsg: {
    width: '80%',
    marginLeft: 12,
    borderColor: "#fff",
    borderBottomColor: "#B7B7B7",
    borderWidth: 1,
  },
  ContactName: {
    fontSize: 20,
    color: "black",
  },
  ContactIcon: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  ContactType: {
    marginTop: 6
  },
  sectionHeaderViewStyle: {
    height: 25,
    justifyContent: 'center',
  },
  IndexStyle: {
    width: "80%",
    fontSize: 20,
    marginLeft: 10
  }
});
