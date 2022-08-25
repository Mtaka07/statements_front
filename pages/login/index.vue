<template>
    <div>
        <h2 class="login-title">ログイン</h2>
        <div class="main-contents">
            <div class="login-warapper">
                <form class="loginForm" action="" method="POST" @submit.prevent>
                    <div class="left-warapper">
                        <div class="mail-login-area">
                            <div class="login-mail">
                                <label class="mail-title">メールアドレス：</label>
                                <input class="regist-inp" type="email" name="email" autocomplete="email" v-model="form.mail" placeholder="アカウントID(メールアドレス)">
                            </div>
                            <div class="login-pass">
                                <label class="pass-title">パスワード</label>
                                <input class="login-password" type="password" name="password" autocomplete="password" v-model="form.password">
                            </div>
                            <div class="submit-btn-area">
                                <button class="sub-btn" type="button" @click="login()">送信</button>
                            </div>
                            <div class="submit-btn-area">
                                <button class="back-btn" type="button" @click="back()">戻る</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="media-contents">
                    <div class="right-warapper">
                        <div class="google">
                            <button class="google-btn" type="button">Googleでログイン</button>
                        </div>
                        <div class="line">
                            <button class="line-btn" type="button">Lineでログイン</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component,Vue } from "vue-property-decorator";
import SystemApi from "~/models/apis/system";

@Component
export default class Login extends Vue {
form:any = {
    mail: '',
    password: '',
    remember: true
}

errorText:string = "";
isError:boolean = false;

async asyncData() {

}

async mounted() {
    this.form.mail = localStorage.getItem('mail.local')
    this.form.password = localStorage.getItem('password.local')
}

async login()
{
    const response = await this.$auth.loginWith('local', {data: this.form} );
    if(!response.data.result) {
        this.errorText = response.data.message
        this.isError = true
        return
    }
    try {
        if(this.form.remember) {
            localStorage.setItem('mail.local', this.form.mail);
            localStorage.setItem('password.local', this.form.passsword);
        }
        this.$router.push('/home/');
    } catch (error) {
        const response = error
        console.error(error);
    }
}



back() {
    this.$router.go(-1)
}

}

</script>
<style lang="scss">
.login-title {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}
.login-warapper .right-warapper {
    flex-grow: 1;
    height: 140px;
    line-height: 84px;  
}
.regist-inp {
    width:295px;
    height: 25px;
}
.login-password {
    width:295px;
    height: 25px;
}
.google-btn {
    width:300px;
    height: 40px;
    border: none;
    background: #0000FF;
    color: #fff;
    background-image: url("/image/google-logo.png");
    background-repeat: no-repeat;
    background-size: 40px;
    color: #fff;
    cursor: pointer;
}
.line-btn {
    width:300px;
    height: 40px;
    border: none;
    background: #06C755;
    background-image: url("/image/line-logo.png");
    background-repeat: no-repeat;
    background-size: 40px;
    color: #fff;
    cursor: pointer;
}

.login-mail {
    margin-bottom: 25px;
}
.main-contents {
    display: flex;
    justify-content: center;
}
.media-contents {
    margin-top: 50px;
}
.description {
    color: #EE0000;
    font-size: 14px;
}
.mail-login-area {
    margin: 0 auto;
    width: 300px;
    margin-top: 37px;
}
.sub-btn {
    width: 150px;
    border: none;
    background: #0000FF;
    color: #fff;
    border-radius: 4px;
    height: 30px;
    margin-top: 30px;
    cursor: pointer;
}
.back-btn {
    width: 150px;
    border: none;
    background: #DD0000;
    color: #fff;
    border-radius: 4px;
    height: 30px;
    margin-top: 30px;
    cursor: pointer;
}
.submit-btn-area {
    text-align: center;
}

</style>