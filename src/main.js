import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import store from './store'

Vue.config.productionTip = false

firebase.initializeApp({
  databaseURL: "https://spa-auth-4f312.firebaseio.com",
  projectId: "spa-auth-4f312",
  storageBucket: "spa-auth-4f312.appspot.com"
});

export const db = firebase.firestore();

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
