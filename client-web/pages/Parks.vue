<template>
  <div>
    <h1>Parker</h1>
    <google-map name="woofbuddy"></google-map>
    <p>Vælg en park på kortet for at booke en dag</p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GoogleMap from "../components/GoogleMap.vue";
import ParkService, { IPark } from "../services/Parks";

@Component({ components: { GoogleMap } })
export default class Parks extends Vue {
  parks: Array<IPark> = [];

  created() {
    this.showAll();
  }

  showAll() {
    let parkService = new ParkService();
    parkService.fetchAll().then(response => {
      this.parks = response.content;
    });
  }
}
</script>

