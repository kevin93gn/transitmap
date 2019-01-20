import React, { Component } from 'react';
import './App.css';
import Map from './component/map/map';

const API_CONFIG = {
  key:'AIzaSyASdqEa_TiJh82_xwQjo5jjNwmT4kvAAgQ',
  language: 'es',
  libraries: [
    'places',
    'geometry',
    'drawing'
  ]
}
const initialPosition = {lat: -33.4451920005, lng: -70.6455860001};
const waypoints = [
  {lat: -33.4451920005, lng: -70.6455860001},
  {lat: -33.4451200005, lng: -70.6456080001},
  {lat: -33.4444200005, lng: -70.6458100001},
  {lat: -33.4439540005, lng: -70.6459150001}
]
const markers = []

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="location">Lista</div>
        <Map
        config={API_CONFIG}
        initialPosition={initialPosition}
        initialPosition={initialPosition}
        zoom={18}
        markers={markers}
        waypoints={waypoints}
        height={550}
        width={600}
        />
      </div>
    );
  }
}

export default App;
