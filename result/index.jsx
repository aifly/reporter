import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
class ResultApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var mainStyle = {
				background:'#333 url(./assets/images/7.jpg) no-repeat center bottom',
				backgroundSize:'cover',
				height:this.viewH 
			}

		return (
			<div className='lt-result-main-ui' style={mainStyle}>
				  <ul ref="scene" className={"scene "}
          data-friction-x="0.05"
          data-scalar-x="25"
           data-scalar-y="0"
           data-limit-y='0'
          >
	            <li className="layer" style={{height:this.viewH}} data-depth="0.250">
	            	<img className='zmiti-bj' src='./assets/images/bj.png'/>
	            	<video ref='video' width="100%" controls='controls'>
	            		<source src='./assets/vidoes/1.mp4'  type='video/mp4'/>
	            		<source src='./assets/vidoes/1.webm'  type='video/webm'/>
	            	</video>
	            </li>
	        </ul>
			</div>
		);
	}


	componentDidMount() {
	}
}
export default PubCom(ResultApp);