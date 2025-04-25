import  { useEffect, } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";


const atms = async () => {

  try {
   
    const response = await fetch('atms.json'
    
    );
    const result = await response.json();
    console.log(result);
    return result.elements;
  } catch (error) {
    console.error(error);
  }
};

const LeafletGeocoder = ({ setAtmMarkers ,atmIcon}) => {
  const map = useMap();

  useEffect(() => {
    atms().then((res) => {
      const markers = res.map((el) => {
        const marker = L.marker([el.lat, el.lon],{icon:atmIcon}).addTo(map);
        marker.atmData = el;  // Armazena dados do ATM no marcador
        return marker;
      });
      setAtmMarkers(markers);  // Atualiza o estado com os marcadores
    });
  }, [map, setAtmMarkers]);

  return null;
};

export default LeafletGeocoder;
