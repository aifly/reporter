import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class WordsListApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			list:[
				{
					img:'./assets/images/fupin.png',
					times:19,
					defaultTimes:19,
					name:'扶贫'
				},{
					img:'./assets/images/shengtai.png',
					times:39,
					defaultTimes:39,
					name:'生态'
				},{
					img:'./assets/images/kaifang.png',
					times:49,
					defaultTimes:49,
					name:'开放'
				},{
					img:'./assets/images/gaige.png',
					times:100,
					defaultTimes:100,
					name:'改革'
				},{
					img:'./assets/images/chuangxin.png',
					times:117,
					defaultTimes:117,
					name:'创新'
				},{
					img:'./assets/images/fazhan.png',
					times:238,
					defaultTimes:238,
					name:'发展'
				}
			]
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var mainStyle = {
			background:'url(./assets/images/bg.jpg) no-repeat center top',
			backgroundSize:'cover',
			height:this.viewH

		};
		return (
			<div className='lt-wordslist-main-ui lt-full' style={mainStyle}>
				<ul style={{height:this.viewH - 20,marginTop:10}}>
					{this.state.list.map((item,i)=>{
						return <li key={i}>
							 <div className='lt-wordlist-img'>
							 	<img src={item.img}/>
							 </div>
							 <div>
							 总书记两会重要讲话中,<span style={{color:i%2===0?'#ffff00':'#99ccff'}}><label>{item.defaultTimes}</label><em>{item.times|0}</em></span>次<br/>提到{item.name}
							 </div>
							 <canvas width={this.viewW/10*6} height={this.viewW/10*2} ref={'canvas_'+i}></canvas>
						</li>
					})}
				</ul>
			</div>
		);
	}


	componentDidMount() {
		
		var {obserable} = this.props;
		this.starting = true;
		this.start = true;
		obserable.on('startAnimate',()=>{
			if(this.start){
				this.start = false;
				this.startAnimate();
			}
		});

		obserable.on('endAnimate',()=>{
			this.starting = false;
			clearTimeout(this.endtimer);
			this.state.list.forEach((item,i)=>{
				item.times = item.defaultTimes;
			});
			this.forceUpdate();
		});
		
	}


	startAnimate(){
		
		
		var canvas = this.refs['canvas_0'];
		this.state.list.forEach((item,i)=>{
			item.times = item.times - 19;
			item.x =3;
			item.y = canvas.height/2;
		});

	
		var render = ()=>{


			this.state.list.forEach((item,i)=>{
				var canvas = this.refs['canvas_'+i];
				var context = canvas.getContext('2d');
				
					var x = item.x;
					var y = item.y;
					var w = canvas.width,
					h = canvas.height;
					var isClear=true;
					var defaultTimes = item.defaultTimes;
					
					if(item.y>=h){
						isClear =false;
					}
					isClear && context.clearRect(0,0,w,h);

					context.beginPath();
					context.fillStyle="#189cfb";
					context.strokeStyle="#189cfb";
					context.arc(4,canvas.height/2,3,0,Math.PI*2,false);
					context.closePath();
					context.fill();	
					item.times+=.5;
					if(item.times<=defaultTimes && item.times%1 === 0){

						//this.state.list[i].times = item.times;

						this.forceUpdate();				
					}
				
					if(item.y>=h){
						 item.y = h;
						context.fillRect(h/4+2,h-1,item.x,1);
						item.x+=3;

					}else{
						item.x+=1;
						item.y+=2;
						context.moveTo(3,canvas.height/2);
						context.lineTo(item.x,item.y);
					}
					
					context.stroke();

			});

			this.starting && webkitRequestAnimationFrame(render);
		}
		webkitRequestAnimationFrame(render);

		this.endtimer = setTimeout(()=>{
			this.starting = false;
		},10000)
	}
}
export default PubCom(WordsListApp);