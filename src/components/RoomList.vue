<template>
    <div class="">        
  <div class="row">
    <form @submit.prevent="add_room" class="col s12 ">
      <div class="row">
        <div class="input-field col s3 center">
          <i class="material-icons prefix">room</i>
          <input v-model="input_room_name" id="room_name" type="text" class="validate">
          <label for="room_name">Create Room</label>
          <button type="submit" class="btn">CREATE</button>
        </div>
      </div>
    </form>
    <div class="col s8">
      <ul class="collection with-header">
        <li class="collection-header"><h4>ROOMS</h4></li>
        <li class="collection-item" v-for="(quiz_room, index) in quiz_rooms" :key="index">
            <div>{{ quiz_room.room_name }}<span class="secondary-content"><i class="material-icons">send</i></span></div>
        </li>
      </ul>
    </div>

  </div>
    </div>
</template>

<script>
import db from "../config/firebase";

export default {
  data() {
    return {
      quiz_rooms: [],
      input_user_name: '',
      input_room_name: ''
    };
  },
  methods: {
    // join_room (id) {
    // // this.user_name = localStorage
    // db.collection("rooms").doc(id).update({
    //     "player": [{name: this.user_name}],
    // })
    // .then(function() {
    //     console.log("Document successfully updated!");
    // });
    // },
    // delete_room (id) {
    //     db.collection("rooms").doc(id).delete().then(function() {
    //         console.log("Document successfully deleted!");
    //     }).catch(function(error) {
    //         console.error("Error removing document: ", error);
    //     });
    // },
    add_username(){
        localStorage.setItem('username', this.input_user_name)
        this.input_user_name = ""
    },
    add_room() {
      console.log("add room");
      db.collection("rooms")
        .add({
          room_name: this.input_room_name,
          owner: localStorage.getItem('username'),
        })
        .then((docRef) => {
          this.input_room_name = ""
          console.log("Room created", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding Room: ", error);
        });
    }
  },
  created() {
    db.collection("rooms").onSnapshot(querySnapshot => {
      var rooms_temp = [];
      querySnapshot.forEach(doc => {
        rooms_temp.push({
          id: doc.id,
          ...doc.data()
        });
      });
      this.quiz_rooms = rooms_temp;
      console.log("Created invoke ");
    });
  }
}
</script>

<style scope>
span {
    cursor: pointer;
}

</style>
