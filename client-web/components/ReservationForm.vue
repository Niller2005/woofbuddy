<template>
  <div>
    <div v-if="!reservation">Loading...</div>
    <fieldset v-else class="form-group">
      <legend v-if="reservation.id">Rediger Reservation</legend>
      <legend v-else>Ny Reservation</legend>
      <form v-on:submit.prevent="onSubmit">
        <div v-bind:class="{ 'has-danger': indexedErrors.date }" class="form-group">
          <label for="inputDate" class="form-control-label">Dato</label>
          <input
            type="date"
            v-focus
            name="date"
            id="inputDate"
            v-model="reservation.date"
            class="form-control form-control-danger"
          >
          <div class="form-control-feedback">{{ indexedErrors.date }}</div>
        </div>

        <button class="btn btn-lg btn-primary btn-block" type="submit">Gem</button>
        <button
          class="btn btn-lg btn-secondary btn-block"
          type="button"
          v-on:click="$router.go(-1)"
        >Afbryd</button>
      </form>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ReservationService from "../services/Reservations";
import { IError } from "../services/RestUtilities";
import ParkService, { IPark } from "../services/Parks";
import Park from "../../api/models/Parks";

@Component
export default class ReservationForm extends Vue {
  reservation: any = null;
  park: IPark = null;
  errors: Array<IError> = [];

  get indexedErrors() {
    if (!this.errors) {
      return {};
    }

    return this.errors.reduce(
      (value: { [key: string]: string }, current: IError) => {
        value[current.property] =
          current.constraints[Object.keys(current.constraints)[0]];
        return value;
      },
      {}
    );
  }

  async created() {
    let reservationService = new ReservationService();
    if (this.$route.params.id) {
      reservationService
        .fetch(parseInt(this.$route.params.id))
        .then(response => {
          this.reservation = response.content;
        });
    } else {
      let parkService = new ParkService();
      await parkService
        .fetch(parseInt(this.$route.params.park))
        .then(response => {
          this.park = response.content;
        });
      console.log(this.park);
      let newReservation: any = {
        date: "",
        park: this.park
      };
      this.reservation = newReservation;
    }
  }

  onSubmit() {
    this.saveReservation(this.reservation);
  }

  saveReservation(reservation: any) {
    //this.errors = {};
    let reservationService = new ReservationService();
    reservationService.save(reservation).then(response => {
      if (!response.is_error) {
        this.$router.push({ path: "/resevations" });
      } else {
        this.errors = response.error_content.errors;
      }
    });
  }

  firstError(errors: string[]) {
    return errors ? errors[0] : "";
  }
}
</script>
