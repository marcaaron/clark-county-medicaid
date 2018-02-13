import React, { Component } from 'react';

class List extends Component {
	constructor(props){
		super(props);
		this.state = {
			showIndex:-1,
			lastIndex:-1
		}
	}

	expandItem = (index) => {
		const lastIndex = index;
		const currentFeature = {...this.props.data.features[index]};
		this.props.setFeature(currentFeature);
		this.props.setActiveIndex(index);
		this.setState({lastIndex});
	}
	render() {
    return (
      	<ul>
			{this.props.data.features.map((feature, index) =>
				<li id={`_${index}`} className={this.props.activeIndex===index ?  'active' : 'listItem'} onClick={()=>this.expandItem(index)} key={index}>
					<span><strong>{feature.properties.title.toUpperCase()}</strong></span>
					<div className={this.props.activeIndex===index ? `activeInfo` : 'extraInfo'}>
						<p className="address">{feature.properties.address.toUpperCase()}</p>
						<p>{feature.properties.tel}</p>
					</div>
				</li>
			)}
		</ul>
    );
  }
}

export default List;
