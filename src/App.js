import React, { Component } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './App.css';


class App extends Component {
	constructor(){
		super();
		this.state = {
			currentFeature:{}
		}
	}

	setFeature = (feature)=>{
		const currentFeature = {...feature};
		this.setState({currentFeature});
	}

  render() {

    return (
      <div>
		  <Sidebar setFeature={this.setFeature}/>
		  <Map currentFeature={this.state.currentFeature}/>
      </div>
    );
  }
}

export default App;
