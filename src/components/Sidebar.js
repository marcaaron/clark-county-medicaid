import React, { Component } from 'react';
import List from '../components/List';
import dentists from '../dentists';

class Sidebar extends Component {

  render() {
    return (
      	<div className="sidebar">
			<h1>CLARK COUNTY</h1>
			<h2>DENTAL PROVIDERS</h2>
			<h3>ACCEPTING MEDICAID</h3> 
			<List data={dentists} setFeature={this.props.setFeature}/>
		</div>
    );
  }
}

export default Sidebar;
