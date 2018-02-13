import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import dentists from '../dentists';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2Fhcm9uIiwiYSI6ImNqOTllbndkczBsZ3oyd2xncHFzZGprZHUifQ.ekJzPjUU6iU2rtBtjdxx-A';

class Map extends Component {

	flyToLocation = (currentFeature) => {
		this.map.flyTo({
			center: currentFeature.geometry.coordinates,
			zoom:13
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
			<h4 style="font-size:2em;"><a style="text-decoration:none; color:black;" href='tel:${currentFeature.properties.tel}'>${currentFeature.properties.tel}</a></h4>
		`)
	    .addTo(this.map);
	}

	componentDidMount() {
	    this.map = new mapboxgl.Map({
	    	container: this.mapContainer,
	    	style: 'mapbox://styles/marcaaron/cjdkjdm4640i42rp9ss7lxrsm',
			center:[-122.631643,45.6422167],
		    zoom: 11 // starting zoom,
	    });

		this.map.on('load', (e)=>{
		  // Add the data to your map as a layer
		  this.map.addSource('places', {
		    type: 'geojson',
		    data: dentists
		  });
		});

		dentists.features.forEach((marker, i)=>{
		  // Create a div element for the marker
		  var el = document.createElement('div');
		  // Add a class called 'marker' to each div
		  el.className = 'marker';
		  // By default the image for your custom marker will be anchored
		  // by its center. Adjust the position accordingly
		  // Create the custom markers, set their position, and add to map
		  new mapboxgl.Marker(el, { offset: [0, -23] })
		    .setLngLat(marker.geometry.coordinates)
		    .addTo(this.map);

			el.addEventListener('click', (e)=> {
			  document.getElementById(`_${i}`).scrollIntoView({behavior:"smooth"});
			  this.props.setFeature(marker);
			  this.flyToLocation(marker);
			  this.createPopUp(marker);
	  		  this.props.setActiveIndex(i);
			  e.stopPropagation();
			});
		});
	}

	componentWillUnmount(){
	    this.map.remove();
	}



    render() {
		if (this.props.currentFeature && this.map){
			this.flyToLocation(this.props.currentFeature);
			this.createPopUp(this.props.currentFeature);
		}
    	const style = {
        	position: 'absolute',
        	top: '135px',
        	bottom: 0,
			left:'0',
        	width: '100%'
    	};

    	return <div className="mapbox" style={style} ref={el => this.mapContainer = el} />;
    }
}

export default Map;
