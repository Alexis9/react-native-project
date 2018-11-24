import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';
import MessageData from "./MessageData.json";
import ImageData from "./BadgeData.json"; //加载json文件

let Dimensions = require('Dimensions');
let ScreenWidth = Dimensions.get('window').width; //获取屏幕宽度
let ScreenHeight = Dimensions.get('window').height; //获取屏幕高度

type Props = {};
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component < Props > {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 0
      }; //当前显示页数
    }
    static defaultProps = {
      duration: 1000, //自动论播间隔
    }
    componentDidMount() { //渲染页面后调用
      this._startTimer();

    }
    componentWillUnmount() { //页面销毁时调用
      // 如果存在this.timer，则使用clearTimeout清空。
      this.timer && clearTimeout(this.timer);
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.above}>
          <ScrollView 
              ref="scrollView"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              //当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上
              pagingEnabled={true}
              onScrollBeginDrag={() => {
                this._onScrollBeginDrag()
              }}
              onScrollEndDrag={() => {
                this._onScrollEndDrag()
              }}
              onMomentumScrollEnd={(e) => {
                this._onAnimationEnd(e)
              }}>
              {this._renderAllImage()}
          </ScrollView>
        </View>
        <View style={styles.below}>
          <ScrollView contentContainerStyle={styles.messageList}>
            {this._renderAllMessage()}
          </ScrollView>
        </View>
      </View>
    );
  }

   /*轮播图片展示 */
   _renderAllMessage() {
    let allMessage = [];
    let messagesArr = MessageData.messages;
    for (let i in messagesArr) {
      let messageItem = messagesArr[i];
      allMessage.push(
        <View style={styles.message} key={i}>
        <View>
          <Image 
            source={{uri:messageItem.headImgUrl}}
            style = {styles.headImg}
          />
        </View>
        <View style={styles.messageContent}>
          <View >
            <Text style={styles.nickname}>{messageItem.nickname}</Text>
          </View>
          <View style={styles.messageTextBox}>
            <Text style={styles.messageText}>{messageItem.messageText}</Text>
          </View>
          < FlatList
          data = {
            messageItem.messageImageUrl
          }
          renderItem = {
            ({item}) => <Image
            style ={styles.messageImg}
            source={{uri:item}}
            resizeMethod={"scale"}
          />
          }
          contentContainerStyle = {
            styles.messageImgContainer
          }
          />
          </View>
      </View>
      );
    }
    return allMessage;
  }

  /**开始拖拽 */
  _onScrollBeginDrag() {
    console.log("开始拖拽");
    //清空计时器
    this.timer && clearTimeout(this.timer);
  }

  /**停止拖拽 */
  _onScrollEndDrag() {
    console.log("停止拖拽");
    //开始计时
    this.timer && this._startTimer();
  }

  /*轮播图片展示*/
  _renderAllImage() {
    let allImage = [];  //先定义一个空数组放所有图片
    let imgsArr = ImageData.data; //定义变量存放图片数据
    //遍历数组
    for (let i = 0; i < imgsArr.length; i++) {
      let imgsItem = imgsArr[i];
      allImage.push(
        <Image key={i} source={{ uri: imgsItem.icon }} style={styles.imageStyle} />
      );
    }
    return allImage;
  }

  /*手动滑动分页实现 */
  _onAnimationEnd(e) {
    //求出偏移量
    let offsetX = e.nativeEvent.contentOffset.x;
    //求出当前页数
    let pageIndex = Math.floor(offsetX / ScreenWidth);
    //更改状态机
    this.setState({ currentPage: pageIndex });
  }

/*通过定时器修改当前界面 */
  _startTimer() {
    let scrollView = this.refs.scrollView; //获取ScrollView的实例
    this.timer = setInterval(
      () => {
        console.log('开启定时器');
        let imageCount = ImageData.data.length; //6
        let activePage = 0; //下一页面初始为0
        if (this.state.currentPage >= imageCount + 1) {
          activePage = 0; //当前页面超出页面总数时，回到第一页面
        } else {
          activePage = this.state.currentPage + 1; //下一页面
        }
        this.setState({ currentPage: activePage }); //setState刷新页面
        let offsetX = activePage * ScreenWidth;//设置图片的偏移
        scrollView.scrollResponderScrollTo({ x: offsetX, y: 0, animated: true });
      },
      this.props.duration
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
      backgroundColor: '#dddddd'
    },
    above: {
      flex:3
    },
    below: {
      flex:7,
      flexDirection: "column",
    },
    imageStyle: {
      height: 300,
      width: ScreenWidth,
    },
    pageViewStyle: {
      height: 25,
      width: ScreenWidth,
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    message: {
      backgroundColor: "#fff",
      flexDirection: "row",
      padding: 8,
      borderBottomColor: "#eee",
      borderBottomWidth: 1,
    },
    messageContent:{
      flex:8,
    },
    headImg: {
      width: 50,
      height: 50,
      marginRight: 10
    },
    nickname: {
      color: "#5d6f83",
      fontSize: 20,
    },
    messageTextBox:{
      width:300,
    },
    messageText: {
      fontSize: 20,
      color: "#000"
    },
    messageImgContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      flex: 1
    },
    messageImg: {
      marginRight: 5,
      marginTop: 5,
      width: 100,
      height: 100
    },
})