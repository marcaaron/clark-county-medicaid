import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import geoJSON from '../geoJSON';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2Fhcm9uIiwiYSI6ImNqOTllbndkczBsZ3oyd2xncHFzZGprZHUifQ.ekJzPjUU6iU2rtBtjdxx-A';

class Map extends Component {
	componentDidMount() {
	    this.map = new mapboxgl.Map({
	    	container: this.mapContainer,
	    	style: 'mapbox://styles/marcaaron/cjdkjdm4640i42rp9ss7lxrsm',
			center:[-122.631643,45.6422167],
		    zoom: 11, // starting zoom,
	    });

		// add markers to map
		geoJSON.features.forEach((marker)=>{

		  // create a HTML element for each feature
		  var el = document.createElement('div');
		  el.className = 'marker';
		  let catString ='';
		  marker.properties.categories.forEach((category)=>{
		 	 catString += `${category}`;
		  });
		  // make a marker for each feature and add to the map
		  new mapboxgl.Marker(el)
		  .setLngLat(marker.geometry.coordinates)
		  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
		  .setHTML(`
			  <h3>${marker.properties.title}</h3>
			  	<p>${marker.properties.address}</p>
				<a href="tel:${marker.properties.tel}">${marker.properties.tel}</a>
				<p><strong>Categories:</strong> ${catString}</p>
			`))
		  .addTo(this.map);
		});
	}

	componentWillUnmount(){
	    this.map.remove();
	}

    render() {
    	const style = {
        	position: 'absolute',
        	top: 0,
        	bottom: 0,
			left:0,
        	width: '100%'
    	};

    	return <div style={style} ref={el => this.mapContainer = el} />;
    }
}

export default Map;
