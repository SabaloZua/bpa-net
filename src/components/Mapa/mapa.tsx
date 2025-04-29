'use client';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import L  from "leaflet";
import '@/styles/mapa.css';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Cabecalho from "../Cabecalho";
import GuideDriver from "@/components/Guia";
const LeafletGeocoder = dynamic(() => import("./LeafletGeocoder"), { ssr: false });
const LeafletRoutingMachine = dynamic(() => import("./LeafletRoutingMachine"), { ssr: false });

function App() {
  const position: [number, number] = [-8.829804, 13.246245];
  const [atmMarkers, setAtmMarkers] = useState([]); // Estado para armazenar ATMs
 
    const AtmSteps = [
      { element: '.atms', popover: { title: 'Localizar atms', description: 'Nesta tela, você pode  encontrar Atms perto de si facimente.O icon azul indica a sua localização actual,já os icons verde indicam os Atms com dinheiro e os icons vermelho os sem dinheiro.Se quiser as direcções para chegar a um Atm basta clicar no icon do Atm' } },
      
    ]
    const [showGuide, setShowGuide] = useState(false);
    // Inicializa o driver mas adia o drive() até ter certeza que o elemento existe
    useEffect( () => {
      // Aguarda até que o elemento ".pessoa" esteja presente na DOM
      if (localStorage.getItem('primeiroLogin') == 'true') {
        if(!localStorage.getItem('GuiaAtmE')) {
        // Executa o driver
        setTimeout(() => setShowGuide(true), 100);
        }	
        // Seta a flag para que não execute novamente
      }
    }, []);
  const userIcon = L.icon({
    iconUrl: "/icons/eu.png", // Certifique-se de que esse caminho aponta para o seu ícone
    iconSize: [30, 41],
    iconAnchor: [15, 41],
    popupAnchor: [2, -40],
  });
  
  return (
    <div className="App">
      <Cabecalho Titulo='Atms' subTitulo='Localize Atms perto de si' />
      <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={userIcon} />
        <LeafletGeocoder setAtmMarkers={setAtmMarkers} />
        <LeafletRoutingMachine atmMarkers={atmMarkers} />
      </MapContainer>

              {showGuide && <GuideDriver steps={AtmSteps} onFinish={()=>{
            console.log("Tour finalizado! Inciando o tour novamente");
            localStorage.setItem('GuiaAtmE', 'true');
            setShowGuide(false);
            }} />}
    </div>
  );
}

export default App;
