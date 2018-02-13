import React, { Component } from 'react';
import List from '../components/List';
import dentists from '../dentists';

class Sidebar extends Component {

  render() {
    return (
      	<div className="sidebar">
			<div className="sidebar-header">
				<h1>CLARK COUNTY, WA</h1>
				<h2>DENTAL PROVIDERS</h2>
				<h3>ACCEPTING MEDICAID</h3>
			</div>
			<List
				data={dentists}
				setFeature={this.props.setFeature}
				currentFeature={this.props.currentFeature}
				activeIndex = {this.props.activeIndex}
  			    setActiveIndex={this.props.setActiveIndex}
			/>
		</div>
    );
  }
}

export default Sidebar;
