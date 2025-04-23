import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import dynamic from "next/dynamic";
import 'lrm-graphhopper';
const LeafletRoutingMachine = ({ atmMarkers }) => {
  const map = useMap();
  const userLocation = [-8.829804, 13.246245];
  const routingControl = useRef(null); // Variável para armazenar a rota

  useEffect(() => {
    if (!map || !atmMarkers) return;

    map.on("click", function (e) {
      let clickedATM = null;

      // Verifica se o clique foi em um ATM existente
      atmMarkers.forEach(marker => {
        const latLng = marker.getLatLng();
        if (map.distance(latLng, e.latlng) < 50) {  // Raio de 50m para identificar clique
          clickedATM = marker;
        }
      });

      if (clickedATM) {
        // Remove rota anterior se existir
        if (routingControl.current) {
          map.removeControl(routingControl.current);
          routingControl.current = null; // Zerar para evitar múltiplas referências
        }

        // Criar nova rota
        routingControl.current = L.Routing.control({
          waypoints: [
            L.latLng(userLocation),
            L.latLng(clickedATM.getLatLng()),
          ],
          router: L.Routing.graphHopper("0620f3da-4b35-4ead-9e94-79e968ba8e23",{
          
            urlParameters: {
              vehicle: "foot", // Define o modo pedestre
              locale: "pt_BR"
            }
          }),
          lineOptions: {
            styles: [{ color: "green", weight: 5, opacity: 0.5 }],
          },
          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: false,
          createMarker: () => { // Desativa a criação automática de marcadores
            return null;
          }
        }).addTo(map);

        // Adiciona listener para capturar erros de roteamento
        routingControl.current.on("routingerror", function (e) {
          console.error("Routing error:", e.error);
        });
      }
    });
  }, [map, atmMarkers]);

  return null;
};

export default dynamic(() => Promise.resolve(LeafletRoutingMachine), { ssr: false });