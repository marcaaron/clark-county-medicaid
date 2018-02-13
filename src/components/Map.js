import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import dentists from '../dentists';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2Fhcm9uIiwiYSI6ImNqOTllbndkczBsZ3oyd2xncHFzZGprZHUifQ.ekJzPjUU6iU2rtBtjdxx-A';

class Map extends Component {
	componentDidMount() {
	    this.map = new mapboxgl.Map({
	    	container: this.mapContainer,
	    	style: 'mapbox://styles/mapbox/light-v9',
			center:[-122.631643,45.6422167],
		    zoom: 11 // starting zoom,
	    });

		this.map.on('load', (e)=>{
		  // Add the data to your map as a layer
		  this.map.addLayer({
		    id: 'locations',
		    type: 'symbol',
		    // Add a GeoJSON source containing place coordinates and information.
		    source: {
		      type: 'geojson',
		      data: dentists
		    },
		    layout: {
		      'icon-image': 'dentist-15',
		      'icon-allow-overlap': true,
		    }
		  });
		});

		this.map.on('click',(e)=>{
			console.log(e);
			 var features = this.map.queryRenderedFeatures(e.point, { layers: ['locations'] });
			   if (features.length) {
			    var clickedPoint = features[0];
			    // 1. Fly to the point
			    this.flyToLocation(clickedPoint);
			    // 2. Close all other popups and display popup for clicked store
			    this.createPopUp(clickedPoint);
			}
		});
	}

	componentWillUnmount(){
	    this.map.remove();
	}

	flyToLocation = (currentFeature) => {
		this.map.flyTo({
			center: currentFeature.geometry.coordinates,
			zoom:15
		});
	}

	createPopUp = (currentFeature) => {
	  var popUps = document.getElementsByClassName('mapboxgl-popup');
	  // Check if there is already a popup on the map and if so, remove it
	  if (popUps[0]) popUps[0].remove();

	  var popup = new mapboxgl.Popup({ closeOnClick: false })
	    .setLngLat(currentFeature.geometry.coordinates)
	    .setHTML(`
			<h3>${currentFeature.properties.title}</h3>
			<h4>${currentFeature.properties.address}</h4>
			<h4>${currentFeature.properties.tel}</h4>
		`)
	    .addTo(this.map);
	}

    render() {
		if (this.props.currentFeature && this.map){
			this.flyToLocation(this.props.currentFeature);
			this.createPopUp(this.props.currentFeature);
		}
    	const style = {
        	position: 'absolute',
        	top: 0,
        	bottom: 0,
			left:'33.3333%',
        	width: '66.6666%'
    	};

    	return <div style={style} ref={el => this.mapContainer = el} />;
    }
}

export default Map;
