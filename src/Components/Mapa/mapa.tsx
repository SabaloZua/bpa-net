'use client';
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Geocoder from "leaflet-control-geocoder";
import L from "leaflet";
import '@/styles/mapa.css';
import dynamic from "next/dynamic";
import { useState } from "react";
const LeafletGeocoder = dynamic(() => import("./LeafletGeocoder"), { ssr: false });
const LeafletRoutingMachine = dynamic(() => import("./LeafletRoutingMachine"), { ssr: false });

function App() {
  const position: [number, number] = [-8.829804, 13.246245];
  const [atmMarkers, setAtmMarkers] = useState([]); // Estado para armazenar ATMs

  return (
    <div className="App">
      <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletGeocoder setAtmMarkers={setAtmMarkers} />
        <LeafletRoutingMachine atmMarkers={atmMarkers} />
      </MapContainer>
    </div>
  );
}
const DefaultIcon = L.icon({
  iconUrl: "/icons/atm.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
export default App;
