import React, { Component } from 'react';
import './App.css';
import Map from './component/map/map';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';
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
var waypoints = [
  {lat: -33.4451920005, lng: -70.6455860001},
  {lat: -33.4451200005, lng: -70.6456080001},
  {lat: -33.4444200005, lng: -70.6458100001},
  {lat: -33.4439540005, lng: -70.6459150001}
]
const way1 = [
  {lat: -33.4451920005, lng: -70.6455860001},
  {lat: -33.4451200005, lng: -70.6456080001}
]
const way2 = [
  {lat: -33.4444200005, lng: -70.6458100001},
  {lat: -33.4439540005, lng: -70.6459150001}
]
const markers = []
var products = [{
  id: 1,
  name: "Item name 1",
  price: 100
},{
  id: 2,
  name: "Item name 2",
  price: 100
}];
var ReactBsTable = window.BootstrapTable;
var selected = 0;
class App extends Component {

  onRowClick(row) {
    console.log(row);
    alert(row.name);
    if (row.id==1){
      this.setState(waypoints: way1);
    }else if(row.id==2){
      this.setState(waypoints: way2);
    }
  }


  render() {

    const options = {
      onRowClick: this.onRowClick
    };
    

    return (      
      <div className="App">
        <div className="location">
        <BootstrapTable data={products} striped={true} hover={true} options={ options }>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField="price" >Product Price</TableHeaderColumn>
        </BootstrapTable>

        </div>
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
