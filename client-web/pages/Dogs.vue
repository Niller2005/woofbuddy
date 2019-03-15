<template>
  <div>
    <h1>Hunde</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Navn</th>
          <th>Race</th>
          <th>Alder</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dog in dogs" :key="dog.id">
          <td>{{dog.name}}</td>
          <td>{{dog.race}}</td>
          <td>{{dog.age}}</td>
          <td>
            <button type="button" class="btn btn-danger" v-on:click="deleteDog(dog)">Slet</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn btn-success" to="/dogs/new">Tilføj</router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DogService, { IDog } from "../services/Dogs";

@Component
export default class Dogs extends Vue {
  dogs: Array<IDog> = [];

  created() {
    this.showAll();
  }

  showAll() {
    let dogService = new DogService();
    dogService.fetchAll().then(response => {
      this.dogs = response.content;
    });
  }

  deleteDog(dog: IDog) {
    let dogService = new DogService();
    dogService.delete(dog.id).then(response => {
      let updatedDogs = this.dogs;
      updatedDogs.splice(updatedDogs.indexOf(dog), 1);
      this.dogs = updatedDogs;
    });
  }

  get hasNoSearchResults() {
    return this.dogs && this.dogs.length == 0;
  }
}
</script>
