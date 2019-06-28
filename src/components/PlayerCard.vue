<template>
  
    <div class="col s3">
      <div class="card">
          <span :class="['card-title',player.color]" style="padding: 20px">{{ player.name }}</span>
        <div class="card-content">
          <h1>{{ player.score }}</h1>
        </div>
        <div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
</div>
      </div>
    </div>
</template>
<script>
export default {
  props: ['player']
}
</script>
