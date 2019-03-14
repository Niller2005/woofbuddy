<template>
  <div>
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">WoofBuddy</a>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/parks">
              Parker
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="/dogs">
              Hunde
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="/resevations">
              Reservationer
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <button
          class="btn btn-outline-warning my-2 my-sm-0"
          type="button"
          v-on:click="signOut"
        >Sign out</button>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AuthService from "../services/Auth";

@Component
export default class DefaultLayout extends Vue {
  signOut() {
    let authService = new AuthService();
    authService.signOut();
    this.$router.push({ path: "/?signedOut=1" });
  }
}
</script>
