<template>
<div>
  <style scoped>
      body {
        background-image: url("/image/back.png");
        background-repeat:no-repeat;
        width:100;
        height:100vh;
        background-position:center; 
      }
    </style>
  <div class="ly_conts">
      <button class="el_btn el_btn--red" @click="registration()">新規会員登録</button>
      <button class="el_btn el_btn--red" @click="login()">ログイン</button>
      <button @click="back()" class="el_btn el_btn--gray hp_mb0">戻る</button>
    </div>
</div>
</template>


<script lang="ts">
  import { Component,Vue } from "vue-property-decorator";
  import SystemApi from "~/models/apis/system";

@Component
export default class Registration extends Vue {
  member:any = {
      email: '',
  }
  apiErrMessage:string = ""
async asyncData() {

}

async mounted() {
  
}

registration() { 
  this.$router.push("/registration")
}

login() {
  this.$router.push("/login")
}

back() {
  this.$router.go(-1)
}

closeModal() {
  //this.errorText = ""
}

}

</script>

<style lang = "scss" scoped>
  .ly_conts {
    display: flex;
    margin-top: 540px;
  }
  
</style>

