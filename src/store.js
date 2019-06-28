import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizzes: [{
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/senamotak.jpg',
      answer: 'senam otak'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/lidahbuaya.jpg',
      answer: 'lidah buaya'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/jashujan.jpg',
      answer: 'jas hujan'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/untaianbunga.jpg',
      answer: 'untaian bunga'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/korbanphp.jpg',
      answer: 'korban php'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/patroligabungan.jpg',
      answer: 'patroli gabungan'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/isiulang.jpg',
      answer: 'isi ulang'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/kemejakotor.jpg',
      answer: 'kemeja kotor'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/pulauseribu.jpg',
      answer: 'pulau seribu'
    },
    {
      question: 'http://mini-wp.isnanirsyad.online/images-gamegbr/aduk kopi.jpg',
      answer: 'aduk kopi'
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
