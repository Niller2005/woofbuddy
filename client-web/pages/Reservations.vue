<template>
  <div>
    <h1>Reservationer</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Park</th>
          <th>Dato</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{reservation.park.location}}</td>
          <td>{{reservation.date | moment("dddd, Do MMMM YYYY")}}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="deleteReservation(reservation)"
            >Slet</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ReservationService, { IReservation } from "../services/Reservations";

@Component
export default class Reservations extends Vue {
  reservations: any = [];

  created() {
    this.showAll();
  }

  showAll() {
    let reservationService = new ReservationService();
    reservationService.fetchAll().then(response => {
      this.reservations = response.content;
    });
  }

  deleteReservation(reservation: any) {
    console.log(reservation);
    let reservationService = new ReservationService();
    reservationService.delete(reservation.id).then(response => {
      let updatedReservations = this.reservations;
      updatedReservations.splice(updatedReservations.indexOf(reservation), 1);
      this.reservations = updatedReservations;
    });
  }
}
</script>
