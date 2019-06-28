import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainIndex: 0,
    quizzes: [{
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/senamotak.jpg',
      answer: 'senam otak'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/lidahbuaya.jpg',
      answer: 'lidah buaya'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/untaianbunga.jpg',
      answer: 'untaian bunga'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/patroligabungan.jpg',
      answer: 'patroli gabungan'
    }]
  },
  mutations: {
    increment (state) {
      state.mainIndex++
    }
  },
  actions: {

  }
})
