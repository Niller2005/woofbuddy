<template>
  <div>
    <div v-if="!dog">Loading...</div>
    <fieldset v-else class="form-group">
      <legend v-if="dog.id">Rediger Hund</legend>
      <legend v-else>Ny Hund</legend>
      <form v-on:submit.prevent="onSubmit">
        <div v-bind:class="{ 'has-danger': indexedErrors.name }" class="form-group">
          <label for="inputName" class="form-control-label">Navn</label>
          <input
            type="text"
            v-focus
            name="name"
            id="inputName"
            v-model="dog.name"
            class="form-control form-control-danger"
          >
          <div class="form-control-feedback">{{ indexedErrors.name }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': indexedErrors.race }" class="form-group">
          <label for="inputRace" class="form-control-label">Race</label>
          <input
            type="text"
            name="race"
            id="inputRace"
            v-model="dog.race"
            class="form-control form-control-danger"
          >
          <div class="form-control-feedback">{{ indexedErrors.race }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': indexedErrors.age }" class="form-group">
          <label for="inputAge" class="form-control-label">Alder</label>
          <input
            type="number"
            name="age"
            id="inputAge"
            v-model="dog.age"
            class="form-control form-control-danger"
          >
          <div class="form-control-feedback">{{ indexedErrors.age }}</div>
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
import DogService, { IDog } from "../services/Dogs";
import { IError } from "../services/RestUtilities";

@Component
export default class DogForm extends Vue {
  dog: IDog = null;
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

  created() {
    let dogService = new DogService();
    if (this.$route.params.id) {
      dogService.fetch(parseInt(this.$route.params.id)).then(response => {
        this.dog = response.content;
      });
    } else {
      let newDog: IDog = {
        name: "",
        race: "",
        age: null
      };
      this.dog = newDog;
    }
  }

  onSubmit() {
    this.saveDog(this.dog);
  }

  saveDog(dog: IDog) {
    //this.errors = {};
    let dogService = new DogService();
    dogService.save(dog).then(response => {
      if (!response.is_error) {
        this.$router.go(-1);
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
