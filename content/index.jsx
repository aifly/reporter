import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import   '../components/public/jquery.parallax.js';

class ContentApp extends Component {
	constructor(props) {
		super(props);
		this.state={

		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var mainStyle = {
			background:'url('+this.props.bg+') no-repeat  '+ (this.props.position ||'center center'),
			backgroundSize:'cover',
			width:this.props.gravity?'14rem':'10rem',
			left:this.props.gravity?'-2rem':0,
			top:this.props.gravity?'-2rem':0,
			height:this.viewH + this.viewW/10*(this.props.gravity?4:0)
		}
		return (
			<div className='lt-fupin1-main-ui lt-full'>
				<ul ref="scene" className="scene "
					data-friction-x="0.05"
					data-scalar-x="15"
					data-scalar-y="1"
					data-limit-y='1'
				>
					<li className="layer" style={{height:this.viewH}} data-depth="0.50">
						<div className="lt-fupin1-img-C" style={mainStyle}>
						</div>
					</li>
					<li  className="layer" style={{height:this.viewH}} data-depth="0.25">
						<div className='lt-fp-center-text' style={{top:this.props.top}}>
							<section className='lt-fp-text-C' style={this.props.textStyle}>
							{this.props.words }
							<span>{this.props.subtitle}</span>
							</section>
						</div>
					</li>
				</ul>

			</div>
		);
	}


	componentDidMount() {
		this.props.gravity &&  $(this.refs['scene']).parallax();
	}
}
export default PubCom(ContentApp);