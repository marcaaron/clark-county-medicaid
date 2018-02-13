import React, { Component } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './App.css';


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
  }
}

export default App;
