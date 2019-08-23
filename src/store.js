import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { db } from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imgUrls: ''
  },
  mutations: {
    setImgs: (state, imgUrls) => {
      state.imgUrls = imgUrls
    }
  },
  actions: {
    setImgs: async context => {
      let snapshot = await db.collection('images').get()
        const imgUrls = []
        snapshot.forEach(doc => {
          const data = doc.data()
          imgUrls.push({
            id: doc.id,
            ...data
          })
        })
      context.commit('setImgs', imgUrls)
    }
  }
})
