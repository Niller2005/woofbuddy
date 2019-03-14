import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import AuthLayout from './layouts/Auth.vue';
import DefaultLayout from './layouts/Default.vue';
import SignIn from './pages/SignIn.vue';
import Register from './pages/Register.vue';
import Parks from './pages/Parks.vue';
import Dogs from './pages/Dogs.vue';
import DogForm from './components/DogForm.vue';
import Reservations from './pages/Reservations.vue';
import Contacts from './pages/Contacts.vue';
import ContactForm from './components/ContactForm.vue';

Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  }
});

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AuthLayout,
      children: [
        { path: '/', component: SignIn },
        { path: '/register', component: Register }
      ]
    },
    {
      path: '',
      component: DefaultLayout,
      children: [
        { path: '/parks', component: Parks },
        { path: '/resevations', component: Reservations },
        { path: '/dogs', component: Dogs },
        { path: '/dogs/new', component: DogForm },
        { path: '/contacts', component: Contacts },
        { path: '/contacts/new', component: ContactForm },
        {
          path: '/contacts/edit/:id',
          name: 'editContact',
          component: ContactForm
        }
      ]
    }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App, {})
});

// Hot Module Replacement
declare var module: any;
if (module.hot) {
  module.hot.accept();
}
