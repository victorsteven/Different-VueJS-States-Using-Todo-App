import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        'id': 1,
        'title': 'Finish Vue Screencast',
        'completed': false,
        'editing': false 
      },
      {
        'id': 2,
        'title': 'Take the world',
        'completed': false,
        'editing': false 

      }
    ]
  },

  mutations: {

  },

  actions: {

  }
})