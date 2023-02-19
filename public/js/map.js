

const latlng = {
  lat: -34.397,
  lng: 150.644
};

mapboxgl.accessToken =
  'pk.eyJ1IjoibmlzaC05OCIsImEiOiJja3pyeHZuY3A0NnM2MnFucjNmb3lybjBsIn0.CN8U0XFy08z8ol5hH_L-1g';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: latlng
  });
  document.getElementById("map");

  new mapboxgl.Marker({
    position: latlng,
    map,
    title : "New Map"
})





 
  
  


  



