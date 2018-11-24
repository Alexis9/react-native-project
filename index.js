import {
    AppRegistry,
    Image,
    StyleSheet
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation'
import React from 'react';
import App from './App';
import Login from './Login';
import secondPage from './secondPage';
import storageDemo from './storageDemo';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import FriendCircle from './FriendCircle';
import scrollViewTop from './scrollViewTop';
import chat from './chat';

// AppRegistry.registerComponent('ReactNativeProjects', () => App);
// AppRegistry.registerComponent('ReactNativeProjects', () => Login);
// AppRegistry.registerComponent('ReactNativeProjects',() => storageDemo)
// AppRegistry.registerComponent('ReactNativeProjects', () => App);
// AppRegistry.registerComponent('ReactNativeProjects',() => ContactList)
// AppRegistry.registerComponent('ReactNativeProjects',() => FriendCircle)
// AppRegistry.registerComponent('ReactNativeProjects',() => scrollViewTop)
// AppRegistry.registerComponent('ReactNativeProjects',() => chat)
const styles = StyleSheet.create({
    tabBarIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain'
    }
})

const Main = TabNavigator({
    page1: {
        screen: chat,
        navigationOptions: {
            tabBarLabel: '聊天',
            tabBarIcon: ({
                focused
            }) => {
                if (focused) {
                    return ( <
                        Image style = {
                            styles.tabBarIcon
                        }
                        source = {
                            require('./image/chatSel.png')
                        }
                        />
                    )
                } else {
                    return ( <
                        Image style = {
                            styles.tabBarIcon
                        }
                        source = {
                            require('./image/chat.png')
                        }
                        />
                    );
                }
            }
        }
    },

    page2: {
        screen: ContactList,
        navigationOptions: {
            tabBarLabel: '通讯录',
            tabBarIcon: ({
                focused
            }) => {
                if (focused) {
                    return ( <
                        Image style = {
                            styles.tabBarIcon
                        }
                        source = {
                            require('./image/Addressbooksel.png')
                        }
                        />
                    )
                } else {
                    return ( <
                        Image style = {
                            styles.tabBarIcon
                        }
                        source = {
                            require('./image/Addressbook.png')
                        }
                        />
                    );
                }
            }
        }
    },
    page3: {
        screen: FriendCircle,
        navigationOptions: {
            tabBarLabel: '朋友圈',
            tabBarIcon: ({
                focused
            }) => {
                if (focused) {
                    return ( <
                        Image style = {
                            styles.tabBarIcon
                        }
                        source = {
                            require('./image/friendCircleSel.png')
                        }
                        />
                    )
                } else {
                    return ( <
                        Image style = {
                            styles.tabBarIcon
                        }
                        source = {
                            require('./image/friendCircle.png')
                        }
                        />
                    );
                }
            }
        }
    }
}, {
    initialRouteName: 'page1',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#19ad19', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        style: {
            backgroundColor: '#fff',
            height: 60
        },
        showIcon: true,
    },
});
AppRegistry.registerComponent('ReactNativeProjects', () => Main);

const simpleApp = StackNavigator({
    Login: {
        screen: Login,
    },
    Second: {
        screen: Main,
    },
    third: {
        screen: ContactDetail
    },
    chatPage:{
        screen:chat
    }
});

AppRegistry.registerComponent('ReactNativeProjects', () => simpleApp);