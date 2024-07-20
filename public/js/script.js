const socket= io();

if(navigator.geolocation){
   
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude}=position.coords;
            socket.emit("sendLocation",{latitude,longitude});
        },
        (error)=>{
console.log("Error is ",error)
        }
        ,
        {
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0
        } )
           
    

}
const map=L.map("map").setView([0,0],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const markers={};

socket.on("reciveLocation",(data)=>{
    const {latitude,longitude,id}=data;
  map.setView([latitude,longitude]);

  if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
  }
  else{
      markers[id]=  L.marker.setLatLng([latitude,longitude]).addTo(map);
  }
})