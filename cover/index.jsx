import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import   '../components/public/jquery.parallax.js';

class CoverApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var mainStyle = {
			background:'url(./assets/images/cover.jpg) no-repeat center bottom',
			backgroundSize:'cover',
			width:'10rem',
			left:0,
			top:0,
			height:this.viewH
		}
		return (
			<div className='lt-fupin1-main-ui lt-full'>
					 <ul ref="scene" className={"scene "+(this.props.customerClass?this.props.customerClass:'')}
            data-friction-x="0.05"
            data-scalar-x="25"
             data-scalar-y="0"
             data-limit-y='0'
            >
            <li className="layer" style={{height:this.viewH}} data-depth="0.250">
              <div className="lt-fupin1-img-C" style={mainStyle}>
              </div>
            </li>

            <li  className="layer" style={{height:this.viewH}} data-depth="0.40">
            	<div className={'zmiti-logo '}>
				<img src='./assets/images/logo1.png'/>
			</div>
			<div className={'lt-title-text ' + (this.state.showText?'active':'')}>
				<img src='./assets/images/title.png'/>
			</div>
			<div className={'lt-title-text1 ' + (this.state.showText?'active':'')}>
				<img src='./assets/images/title1.png'/>
			</div>
            </li>
           
        </ul>
					
			</div>
		);
	}


	componentDidMount() {	
 			//$(this.refs['scene']).parallax();

 			setTimeout(()=>{
 				this.setState({
 					showText:true
 				});
 			},1000)
	}
}
export default PubCom(CoverApp);