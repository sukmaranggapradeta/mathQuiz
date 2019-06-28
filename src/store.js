import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 2,
      name: 'Christian',
      color: 'blue darken-1',
      score: 0,
      onQuestion: 1,
      answered: []
    },
    players: [{
      id: 1,
      name: 'Alvin',
      color: 'red darken-1',
      score: 0,
      onQuestion: 1,
      answered: []
    }, {
      id: 2,
      name: 'Christian',
      color: 'blue darken-1',
      score: 0,
      onQuestion: 1,
      answered: []
    }, {
      id: 3,
      name: 'Vianwu',
      color: 'yellow darken-1',
      score: 0,
      onQuestion: 1,
      answered: []
    }, {
      id: 4,
      name: 'Gerard',
      color: 'green darken-1',
      score: 0,
      onQuestion: 1,
      answered: []
    }],
    questions: [
      {
        id: 1,
        url: 'https://images-na.ssl-images-amazon.com/images/I/81Z-GNaPsjL.jpg',
        answer: 'halo',
        score: 30
      },
      {
        id: 2,
        url: 'https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/bobofoto/original/2158_singa.jpg',
        answer: 'singa',
        score: 20
      },
      {
        id: 3,
        url: 'https://vignette.wikia.nocookie.net/nickelodeon-movies/images/7/7e/Patrick_Star.png/revision/latest?cb=20180107193038',
        answer: 'patrick',
        score: 50
      },
    ]
  },
  mutations: {
    addScore(state,payload){
      let you = state.players.findIndex(obj => obj.id == state.user.id)
      state.players[you].score += payload.score
      state.players[you].answered.push(payload.id)
    }
  },
  actions: {
    addScore(context, payload){
      context.commit('addScore',payload)
    }
  }
})
