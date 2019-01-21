import React, { Component } from 'react';
import * as T from 'prop-types';
import loadGoogleMapsAPI from 'load-google-maps-api';
import { searchMap } from './map-styles.js';


class Map extends Component {

    componentDidUpdate(newProps){
        alert('didupdate');
        console.log(newProps);
    }
    componentWillReceiveProps(newProps){
        alert('willreceive');
        loadGoogleMapsAPI( this.props.config ).then( googleMaps => {
            var directionsService = new googleMaps.DirectionsService;
            var directionsDisplay = new googleMaps.DirectionsRenderer;
            //Inicializacion del mapa
            this.map = new googleMaps.Map( this.refs.map, {
                center: this.props.initialPosition,
                zoom: this.props.zoom
            } );

            //Dibujo de ruta
            var origin = new googleMaps.LatLng(this.props.waypoints[0]);
            var destination = new googleMaps.LatLng(this.props.waypoints[this.props.waypoints.length -1]);

            if (newProps.waypoints !== null && newProps.waypoints !== this.props.waypoints){
                var waypoints = []
                for(let index in newProps.waypoints){
                    const item = newProps.waypoints[index]

                    if(!(index < 1 || index == (newProps.waypoints.length - 1))){
                        var resp = new googleMaps.LatLng(item)

                        waypoints.push({
                            location: resp,
                            stopover: true
                        })
                    }
                }
            }
        }).catch( err => {
            console.error(err);
        });
    }

    componentDidMount(){
        loadGoogleMapsAPI( this.props.config ).then( googleMaps => {
            var directionsService = new googleMaps.DirectionsService;
            var directionsDisplay = new googleMaps.DirectionsRenderer;
            //Inicializacion del mapa
            this.map = new googleMaps.Map( this.refs.map, {
                center: this.props.initialPosition,
                zoom: this.props.zoom
            } );

            //Dibujo de ruta
            var origin = new googleMaps.LatLng(this.props.waypoints[0]);
            var destination = new googleMaps.LatLng(this.props.waypoints[this.props.waypoints.length -1]);

            var waypoints = []

            for(let index in this.props.waypoints){
                const item = this.props.waypoints[index]

                if(!(index < 1 || index == (this.props.waypoints.length - 1))){
                    var resp = new googleMaps.LatLng(item)

                    waypoints.push({
                        location: resp,
                        stopover: true
                    })
                }
            }

            directionsService.route({
                origin,
                destination,
                waypoints,
                travelMode: 'DRIVING'
              }, function(response, status) {
                if (status === 'OK') {
                  directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              });

            directionsDisplay.setMap(this.map);
            //Barra de busqueda
            var input = this.refs.search;
            var searchBox = new googleMaps.places.SearchBox(input);
            this.map.controls[googleMaps.ControlPosition.TOP_LEFT].push(input);
            this.map.addListener('bounds_changed', () => {
                searchBox.setBounds(this.map.getBounds());
            });
            //Listener de busqueda
            searchBox.addListener('places_changed', () => {
                var places = searchBox.getPlaces();
                if (places.length === 0) {
                    alert('Referencias no encontradas')
                }
                var bounds = new googleMaps.LatLngBounds();
                places.forEach((place) => {
                    if (!place.geometry) {
                      console.log("Returned place contains no geometry");
                      return;
                    }
                    if (place.geometry.viewport) {
                      bounds.union(place.geometry.viewport);
                    } else {
                      bounds.extend(place.geometry.location);
                    }
                });
                this.map.fitBounds(bounds);
            });
          }).catch( err => {
            console.error(err);
          });
    }

    render() {
        return (
            <div className="map">
                <input
                    type="text"
                    ref="search"
                    placeholder="Buscar dirección"
                    style={searchMap}
                />
                <div ref="map" style={{width: this.props.width, height: this.props.height}}>
                    loading map...
                </div>
            </div>
        )
    }
}

Map.propTypes = {
    config: T.object,
    initialPosition: T.object,
    markers: T.arrayOf(T.object),
    height: T.number,
    width: T.number,
    setLatLng: T.func,
    addMode: T.bool
};

Map.defaultProps = {
    initialPosition: {lat: -34.902606910023145, lng: -56.16617901142024},
    markers: [],
    height: 500,
    width: 500,
    addMode: false
};

export default Map;