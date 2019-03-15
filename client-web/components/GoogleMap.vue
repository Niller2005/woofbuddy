<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
import ParkService, { IPark } from "../services/Parks";
export default {
  name: 'google-map',
  props: ['name'],

  data: function () {
    return {
      mapName: this.name + "-map",
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();

    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 12,
      center: new google.maps.LatLng(55.4049, 10.3474),
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(element, options);

    var splitObject = function (obj, keys) {
      var holder = {};
      keys.forEach(function (d) {
        holder[d] = obj[d];
      })
      return holder;
    }

    let parkService = new ParkService();
    parkService.fetchAll().then(response => {
      response.content.forEach(element => {
        const coord = splitObject(element, ["id", "lon", "lat", "description", "location"])
        console.log(coord)
        const position = new google.maps.LatLng(coord.lat, coord.lon);
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          title: coord.location,
        });
        var contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">' + coord.location + '</h1>' +
          '<div id="bodyContent">' +
          '<p>' + coord.description + '</p>' +
          '<p><a href="/resevations/new/' + coord.id + '">' +
          '<h3>Book en dag</h3></a></p>' +
          '</div>' +
          '</div>';
        attachSecretMessage(marker, contentString);
      });

    })
    this.markers.push(marker)
    this.map.fitBounds(this.bounds.extend(position))

    function attachSecretMessage (marker, secretMessage) {
      var infowindow = new google.maps.InfoWindow({
        content: secretMessage
      });

      marker.addListener('click', function () {
        infowindow.open(marker.get('map'), marker);
      });
    }
  }
};
</script>
<style scoped>
.google-map {
  width: 100%;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
