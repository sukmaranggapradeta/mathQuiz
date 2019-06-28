<template>

  <div>
    <div class="row">
      <PlayerCard v-for="(player,index) in $store.state.players" :player="player" :key="index"/>
    </div>
    <div class="row">
      <Question v-for="(question,index) in $store.state.questions" :index="index" :question="question" :key="index"/>
    </div>
  </div>
</template>
<script>
import PlayerCard from '@/components/PlayerCard.vue'
import Question from '@/components/Question.vue'

export default {
  components:{
    PlayerCard,
    Question
  },
  data(){
    return {
      
    }
  }
};
</script>
