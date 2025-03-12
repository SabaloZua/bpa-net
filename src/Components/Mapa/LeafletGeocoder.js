import  { useEffect, } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const atms = async () => {
  // const url = 'https://atm-locator1.p.rapidapi.com/search?latitude=-8.8406374&longitude=13.2360786&radius=2';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //    'x-rapidapi-key': '5d8de7002bmsha3c4bac4898fd87p170564jsn4b5fb2697c34',
	// 	'x-rapidapi-host': 'atm-locator1.p.rapidapi.com'
  //   }
  // };
//   const query = `
// [out:json];
// node["amenity"="bank"](around:60000,-8.8383,13.2344);
// out;
// `;
  try {
    //const response = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query));
    const response = await fetch('atms.json');
    const result = await response.json();
    console.log(result);
    return result.elements;
  } catch (error) {
    console.error(error);
  }
};

const LeafletGeocoder = ({ setAtmMarkers }) => {
  const map = useMap();

  useEffect(() => {
    atms().then((res) => {
      const markers = res.map((el) => {
        const marker = L.marker([el.lat, el.lon]).addTo(map);
        marker.atmData = el;  // Armazena dados do ATM no marcador
        return marker;
      });
      setAtmMarkers(markers);  // Atualiza o estado com os marcadores
    });
  }, [map, setAtmMarkers]);

  return null;
};

export default LeafletGeocoder;
