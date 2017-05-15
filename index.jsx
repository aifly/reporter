import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/css/index.css';

import IndexApp from './index/index.jsx';
import WordsListApp from './wordslist/index.jsx';
import CoverApp from './cover/index.jsx';
import ContentApp from './content/index.jsx';
import ResultApp from './result/index.jsx';
import Obserable from './components/public/obserable.js';
var obserable = new Obserable();
import $ from 'jquery';
import './assets/js/touch.js';

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage:0
		}
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		var data ={
			currentPage:this.state.currentPage,
			obserable:obserable
		}
		var fupinProps = [
			{
				words:'气场',
				subtitle:'“一带一路”峰会上共有4500名中外记者参与报道，规模宏大、气场壮观。',
				page:this.state.currentPage-1,
				bg:'./assets/images/1.jpg',
				top:'2rem',
				gravity:true,
				textStyle:{

				}
			},
			{
				words:' 交流',
				subtitle:'民心相通，记者先行！',
				page:this.state.currentPage-1,
				bg:'./assets/images/2.jpg',
				top:'11rem',
				position:'center top',
				gravity:true,
				textStyle:{

				}
			},
			{
				words:'忙碌',
				page:this.state.currentPage-1,
				subtitle:"拍摄、专访、写稿、直播……恨不得长出三头六臂",
				bg:'./assets/images/3.jpg',
				top:'10rem',
				gravity:true,
				textStyle:{
					lineHeight:'.8rem'
				}
			},{
				words:'忙碌',
				page:this.state.currentPage-1,
				subtitle:"拍摄、专访、写稿、直播……恨不得长出三头六臂",
				bg:'./assets/images/4.jpg',
				top:'10rem',
				gravity:true,
				textStyle:{
					
				}
			},{
				words:'见证',
				subtitle:'一同见证全球化新时代，共同参与打造“美好新世界”',
				page:this.state.currentPage-1,
				bg:'./assets/images/5.jpg',
				top:'2rem',
				position:'center top',
				gravity:true,
				textStyle:{

				}
			},
			{
				words:'会外',
				subtitle:'会场外的也不闲着，日本记者探访海上丝路重镇',
				page:this.state.currentPage-1,
				bg:'./assets/images/6.jpg',
				top:'11rem',
				position:'left top',
				gravity:false,
				textStyle:{
					lineHeight:'.8rem'
				}
			}
		];
		var components = [
			<CoverApp {...data}></CoverApp>,
		];
		fupinProps.forEach((item,i)=>{
			components.push(<ContentApp {...data} {...item}></ContentApp>)
		});

		var lastStyle = {
			background:'url(./assets/images/end.jpg) no-repeat center top',
			backgroundSize:'cover',
			height:this.viewH
		}
		this.components = components;
		var infoStyle ={
			background:'url(./assets/images/info.png) no-repeat center center',
			backgroundSize:'contain'
		}
		return (
			<div style={{height:this.viewH,overflow:'hidden'}}>

				<ul  ref='lt-main-nav' className='lt-main-nav' style={{height:this.viewH * components.length,WebkitTransform:'translate3d(0,-'+(this.state.currentPage*this.viewH)+'px,0)'}}>
					{components.map((item,i)=>{
						return <li style={{height:this.viewH}} key={i}>{item} <span style={infoStyle} className='lt-info'></span></li>
					})}
					<li style={{height:this.viewH}}>
						<audio preload='auto' ref='audio' src={'./assets/music/bg.mp3'} autoPlay loop></audio>	
						<ResultApp></ResultApp><span className='lt-info' style={infoStyle}></span>
					</li>
				</ul>

			</div>
		);
	}
	componentWillMount() {
		document.querySelector('html').style.fontSize = document.documentElement.clientWidth/10+'px';
		

	}
	wxConfig(title,desc,img){

		  var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);

			$.ajax({
				url:'http://api.zmiti.com/weixin/jssdk.php',
				dataType:'jsonp',
				jsonp: "callback",
				data:{
					type:'signature',
					durl:durl
					},
				jsonpCallback: "jsonFlickrFeed",
				success(data){
					wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: 'wxfacf4a639d9e3bcc', // 必填，公众号的唯一标识
				    timestamp:'1488558145' , // 必填，生成签名的时间戳
				    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
				    signature: data.signature,// 必填，签名，见附录1
				    jsApiList: [ 'checkJsApi',
						  'onMenuShareTimeline',
						  'onMenuShareAppMessage',
						  'onMenuShareQQ',
						  'onMenuShareWeibo',
						  'hideMenuItems',
						  'showMenuItems',
						  'hideAllNonBaseMenuItem',
						  'showAllNonBaseMenuItem'
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
		    	wx.ready(()=>{
		    			 		//朋友圈
                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        link: durl, // 分享链接
                        imgUrl: img, // 分享图标
                        type: "link",
                        dataUrl: "",
                        desc: desc,
                        success: function () { },
                        cancel: function () { }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        link: durl, // 分享链接
                        imgUrl: img, // 分享图标
                        type: "link",
                        dataUrl: "",
                        desc:desc,
                        success: function () { },
                        cancel: function () { }
                    });
                    //qq
                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        link: durl, // 分享链接
                        imgUrl: img, // 分享图标
                        desc: desc,
                        success: function () { },
                        cancel: function () { }
                    });
		    	});
		    }
		});
		
	}

	componentDidMount() {

		$(document).one('touchstart',()=>{
			
			if(this.refs['audio'] && this.refs['audio'].paused){
				this.refs['audio'].play();
			};
		})

		var s = this;
		this.wxConfig('四千记者报盛会，这阵仗你见过吗','场面有多大，带你进入见识一下','http://h5.zmiti.com/public/reporter/assets/images/300.jpg');
		$(this.refs['lt-main-nav']).swipe('up',function(){
				if(s.state.currentPage>=s.components.length-1){
					s.refs['audio'].pause();
				}
				if(s.state.currentPage>=s.components.length){
					s.state.currentPage=s.components.length;

				}else{
					s.state.currentPage=s.state.currentPage+1;
					s.forceUpdate();
				}
				
				if(s.state.currentPage === 1){
					obserable.trigger({type:'startAnimate'});
				}
				else{
					obserable.trigger({type:'endAnimate'});
				}
			 
		}).swipe('down',function(){
			if(s.state.currentPage<=0){
				s.state.currentPage=0
			}else{
				s.state.currentPage=s.state.currentPage-1;
			}
			 s.refs['audio'].paused && s.refs['audio'].play();
			 $('video')[0].pause();
			 s.forceUpdate();
		})
	}
}

window.render = function(){
	ReactDOM.render(<App></App>,document.getElementById('fly-main'));
}
if(window.rendered){
	window.render();
}
