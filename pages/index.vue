<template>
  <div class="contents">
    <img src="image/logo.png" class="logo-img">
    <div class="btn-contents">
        <button class="regist-btn" @click="registration()">新規会員登録</button>
        <button class="login-btn" @click="login()">ログイン</button>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component,Vue } from "vue-property-decorator";
  import SystemApi from "~/models/apis/system";

@Component
export default class Registration extends Vue {
  
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

}

</script>

<style lang = "scss" scoped>
  .logo-img {
    width: 500px;
    height: 500px;
  }
  .contents {
    max-width: 600px;
    margin: 0 auto;
  }
  .regist-btn {
    width: 245px;
    border: none;
    background: #000088;
    color: #fff;
    border-radius: 4px;
  }
  .login-btn {
    width: 245px;
    border: none;
    background: #008800;
    color: #fff;
    border-radius: 4px;
  }

  @media screen and (max-width:420px){
  .contents {
    max-width: 300px;
    margin: 0 auto;
  }
  .logo-img {
    width: 300px;
    height: 300px;
  }
  .regist-btn {
    width: 145px;
    border: none;
    background: #000088;
    color: #fff;
    border-radius: 4px;
  }
  .login-btn {
    width: 145px;
    border: none;
    background: #008800;
    color: #fff;
    border-radius: 4px;
  }
  .ly_conts {
    display: flex;
    margin: 0 auto;
    max-width: 400px;
  }
  .btn-contents {
    max-width: 300px;
    margin: 0 auto;
  }
  }
  
</style>

