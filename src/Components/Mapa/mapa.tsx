'use client';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Geocoder from "leaflet-control-geocoder";
import L  from "leaflet";
import '@/styles/mapa.css';
import dynamic from "next/dynamic";
import { useState } from "react";
const LeafletGeocoder = dynamic(() => import("./LeafletGeocoder"), { ssr: false });
const LeafletRoutingMachine = dynamic(() => import("./LeafletRoutingMachine"), { ssr: false });

function App() {
  const position: [number, number] = [-8.829804, 13.246245];
  const [atmMarkers, setAtmMarkers] = useState([]); // Estado para armazenar ATMs
  const atmIcon = L.icon({
    iconUrl: "/icons/atmD.png",
    iconSize: [30, 41],
    iconAnchor: [20, 41],
    popupAnchor: [2, -40],
  });
  const userIcon = L.icon({
    iconUrl: "/icons/eu.png", // Certifique-se de que esse caminho aponta para o seu ícone
    iconSize: [30, 41],
    iconAnchor: [15, 41],
    popupAnchor: [2, -40],
  });
  
  return (
    <div className="App">
      <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={userIcon} />
        <LeafletGeocoder setAtmMarkers={setAtmMarkers} atmIcon={atmIcon}   />
        <LeafletRoutingMachine atmMarkers={atmMarkers} />
      </MapContainer>
    </div>
  );
}

export default App;
