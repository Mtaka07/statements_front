<template>
    <div>
        <div class="main-contents">
            <h2 class="regist-title">新規会員登録</h2>
            <div class="registration-warapper">
                <form class="loginForm" action="" method="POST" @submit.prevent>
                    <div class="left-warapper">
                        <div class="mail-regist-area">
                            <div class="regist-mail">
                                <label class="mail-title">メールアドレスで登録：</label>
                                <input class="regist-inp" type="email" name="email" id="email" :v-model="member.email" @input="member.email = $event.target.value">
                            </div>
                            <span class="description">※＠statements.netからメールを受け取れるようにしてください</span>
                            <div class="submit-btn-area">
                                <button class="sub-btn" type="button" @click="temporaryRegistration()">送信</button>
                            </div>
                            <div class="submit-btn-area">
                                <button class="back-btn" type="button" @click="back()">戻る</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="right-warapper">
                    <div class="google">
                        <button class="google-btn" type="button">Googleで登録</button>
                    </div>
                    <div class="line">
                        <button class="line-btn" type="button">Lineで登録</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component,Vue } from "nuxt-property-decorator";
import SystemApi from "~/models/apis/system";

@Component
export default class Registration extends Vue {
member:any = {
    email: '',
}

apiErrMessage:string = "";
isError:boolean = false;

async asyncData() {

}

async mounted() {

}

async temporaryRegistration() {
    try {
        console.log(this.member.email)
        const response = await SystemApi.temporaryRegistration(this.member.email);
        console.log(response.result);
        if(response.result) {
            '仮登録完了'
        }else {
            this.apiErrMessage = response.message
            this.isError = true
        }
    }catch (e) {
        this.apiErrMessage = "登録時にエラーが発生しました。"
        this.isError = true;
    }
}

back() {
    this.$router.go(-1)
}

}

</script>
<style lang="scss">
.registration-warapper {
    display: flex;
}
.registration-warapper .left-warapper {
    flex-grow: 1; /*--幅を指定--*/
    position: relative; /*--positionを追加--*/
    height: 300px;
    //line-height: 140px;
    margin-right: 2em;

}
.registration-warapper .right-warapper {
    flex-grow: 1;
    height: 140px;
    line-height: 140px;
    
}
.registration-warapper .left-warapper::after {
    position: absolute; /*--positionを追加--*/
    top: 0;
    left: 100%;
    margin: 0 1rem;
    content: "";
    width: 4px; /*--縦線の太さ(幅)--*/
    height: 354px;
    background-color: #666666; /*--縦線の色--*/
}
.regist-inp {
    width:300px;
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
.regist-title {
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
}
.main-contents {
    margin: 0 auto;
    width: 640px;
}
.description {
    color: #EE0000;
    font-size: 14px;
}
.mail-regist-area {
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