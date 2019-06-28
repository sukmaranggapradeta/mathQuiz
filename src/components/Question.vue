<template>
  <transition name="fade" mode="out-in">
    <div v-if="$store.state.user.onQuestion == question.id" class="col s6">
          <h2 class="header">Question No. {{ index }}</h2>
          <div class="card horizontal">
            <img :src="question.url" width="500px" height="500px">
            <div class="card-stacked">
              <div class="card-content">
                <p>What is the correct logical word for this image?</p>
                <form @submit.prevent="checkAnswer">
                  <div class="input-field col s6">
              <input v-model="choice" placeholder="Your Answer" id="first_name" type="text" :class="['validate', isCorrect == true ? 'valid' : isCorrect == false ? 'invalid' : '']" autofocus>
              <span class="helper-text" data-error="Wrong Answer, try again" data-success="Correct!"></span>
            </div>
                </form>
              </div>
              <div class="card-action">
                <a href="#">Skip</a>
              </div>
            </div>
          </div>
        </div>
  </transition>
</template>

<script>
export default {
  props: ['question','index'],
  data(){
     return {
       choice: '',
       isCorrect: null
     }
  },
  methods:{
    checkAnswer(){
      if(this.choice.toLowerCase() == this.question.answer){
        this.isCorrect = true
        this.$store.dispatch('addScore', this.question)
      }
      else {
        this.isCorrect = false
      }
    }
  }
}
</script>

<style>

</style>
