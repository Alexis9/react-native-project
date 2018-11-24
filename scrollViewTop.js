/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View
} from 'react-native';

let Dimensions = require('Dimensions');
let ScreenWidth = Dimensions.get('window').width;//获取屏幕宽度
let ScreenHeight = Dimensions.get('window').height;//获取屏幕高度

import ImageData from "./BadgeData.json"; //加载json文件

export  default class scrollViewTop extends Component {
  
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };//当前显示页数
  }

  static defaultProps = {
    duration: 1000, //自动论播间隔
  }


  componentDidMount() {  //渲染页面后调用
    this._startTimer();

  }

  componentWillUnmount() {//页面销毁时调用
    // 如果存在this.timer，则使用clearTimeout清空。
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.continer}>
        <ScrollView
          ref='scrollView'
          //水平方向
          horizontal={true}
          //当值为true时显示滚动条
          showsHorizontalScrollIndicator={false}
          //当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上
          pagingEnabled={true}
          onMomentumScrollEnd={(e)=>{this._onAnimationEnd(e)}}
          onScrollBeginDrag={()=>{this._onScrollBeginDrag()}}
          onScrollEndDrag={()=>{this._onScrollEndDrag()}}
          >
          {this._renderAllImage()}
        </ScrollView>
        <View style={styles.pageViewStyle}>
         {this._renderAllIndicator()} 
        </View>
      </View>
    );
  }

  /**开始拖拽 */
  _onScrollBeginDrag(){
    console.log("开始拖拽");
    //清空计时器
    this.timer && clearTimeout(this.timer);
  }
  /**停止拖拽 */
  _onScrollEndDrag(){
    console.log("停止拖拽");
	//开始计时
    this.timer &&this._startTimer();
  }

  /*轮播图片展示 */
  _renderAllImage() {
    let allImage = [];
    let imgsArr = ImageData.data;
    for (let i = 0; i < imgsArr.length; i++) {
      let imgsItem = imgsArr[i];
     allImage.push(
        <Image key={i} source={{uri:imgsItem.icon}} style={styles.imageStyle} />
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

    /*页面指针实现 */
    _renderAllIndicator() {
    let indicatorArr = [];
    let style;
    let imgsArr = ImageData.data; 
    for (let i = 0; i < imgsArr.length; i++) {
      style = (i==this.state.currentPage)?{color:'orange'}:{color:'white'};
      indicatorArr.push(
        <Text key={i} style={[{fontSize:30},style]}>
         &bull;
        </Text>
      );
    }
    return indicatorArr;
  }

  /*通过定时器修改当前界面 */
    _startTimer(){
    let scrollView = this.refs.scrollView; //获取ScrollView的实例
    this.timer = setInterval(
      ()=>{console.log('开启定时器'); 
       let imageCount = ImageData.data.length; //6
       let activePage = 0; //下一页面初始为0
       if(this.state.currentPage>=imageCount+1){
         activePage = 0; //当前页面超出页面总数时，回到第一页面
       }else{
         activePage = this.state.currentPage+1; //下一页面
       }
       this.setState({currentPage:activePage}); //setState刷新页面     
       let offsetX = activePage * ScreenWidth;//设置图片的偏移
       scrollView.scrollResponderScrollTo({x:offsetX,y:0,animated:true});
      },
       this.props.duration
     );
    }
}

const styles = StyleSheet.create({
  continer:{
    backgroundColor: '#dddddd'
  },
  imageStyle:{
    height:400,
    width:ScreenWidth
  },
  pageViewStyle:{
    height:25,
    width:ScreenWidth,
    backgroundColor:'rgba(0,0,0,0.4)',
    position:'absolute',
    bottom:0,

    flexDirection:'row',
    alignItems:'center',
  }
});

