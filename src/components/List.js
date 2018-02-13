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
		if(this.state.lastIndex>-1){
			document.getElementById(`list_${this.state.lastIndex}`)
				.style
				.display='none';
			document.querySelector(`.listItem_${this.state.lastIndex}`)
				.style
				.border='none';
		}
		const listItem = document.getElementById(`list_${index}`);
		listItem.style.display='block';
		document.querySelector(`.listItem_${index}`)
			.style.border = '2px solid black';
		const lastIndex = index;
		const currentFeature = {...this.props.data.features[index]};
		this.props.setFeature(currentFeature);
		this.setState({lastIndex});
	}

	render() {
    return (
      	<ul>
			{this.props.data.features.map((feature, index) =>
				<li className={`listItem_${index}`} onClick={()=>this.expandItem(index)} key={index}>
					<span>{feature.properties.title.toUpperCase()}</span>
					<div className="extraInfo" id={`list_${index}`}>
						<span>{feature.properties.address.toUpperCase()}</span>
						<span>{feature.properties.tel}</span>
					</div>
				</li>
			)}
		</ul>
    );
  }
}

export default List;
