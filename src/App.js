import React, { Component } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './App.css';
import Modernizr from './modernizr';

class App extends Component {
	constructor(){
		super();
		this.state = {
			currentFeature:{},
			activeIndex:-1
		}
	}

	setFeature = (feature)=>{
		const currentFeature = {...feature};
		this.setState({currentFeature});
	}

	setActiveIndex = (index) => {
		const activeIndex = index;
		this.setState({activeIndex});
	}

  render() {
	if (Modernizr.webgl) {
  	// supported
	return (
      <div>
		  <Sidebar
			  setFeature={this.setFeature}
			  currentFeature={this.state.currentFeature}
			  setActiveIndex={this.setActiveIndex}
			  activeIndex={this.state.activeIndex}
		  />
		  <Map
			  currentFeature={this.state.currentFeature}
			  setFeature={this.setFeature}
  			  setActiveIndex={this.setActiveIndex}
		  />
      </div>
    );
	} else {
  	// not-supported
		return(
	      <div style={{margin:'2em', textAlign:'center'}}>
			Please enable WebGL on your browser to view this project.<br/><br/>
			Visit <a href="https://get.webgl.org/">https://get.webgl.org/</a> for additional information.
	      </div>
		);
	}

  }
}

export default App;
