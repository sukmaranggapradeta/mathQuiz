<template>
  <div class="home">
    <div class="row">
      <form @submit.prevent="add_username" class="col s12">
        <div class="row">
          <div class="input-field col s3 center">
            <i class="material-icons prefix">account_circle</i>
            <input v-model="input_user_name" id="icon_prefix" type="text" class="validate">
            <label for="icon_prefix">Your Name</label>
            <button type="submit" class="btn">GO</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../config/firebase";

export default {
  data() {
    return {
      input_user_name: "",
    };
  },
  methods: {
    add_username() {
      localStorage.setItem("username", this.input_user_name);
      this.input_user_name = ""
      this.$router.push('/rooms')
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
