 function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 36.9741, lng: -122.0308}
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}