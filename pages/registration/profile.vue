<template>
    <div class="ly_conts">
        <h1 class="bl_pageTtl">プロフィール登録</h1>
        <ValidationObserver v-slot="{ invalid }">
            <div class="contents">
                <from action="" method="POST" @submit.prevent>
                    <label class="el_label el_label--required">ニックネーム:</label>
                    <ValidationProvider v-slot="{ errors }" rules="required">
                        <input type="text" name="name" id="name" class="nickname-inp"
                                :value="member.name"
                                v-bind:class="[ errors.length > 0 ? 'error' : '' ]"
                                @input="member.name = $event.target.value">
                    </ValidationProvider>
                    <label class="el_label el_label--required">パスワード:</label>
                    <div clas="el_inputPass_wrapper">
                        <ValidationProvider v-slot="{ errors }" rules="required|confirmed:confirmation|min:8">
                            <input type="el_inputPass hp_mb10p" name="password" id="password" class="pass-inp"
                                :value="member.password"
                                v-bind:class="[ errors.length > 0 ? 'error' : '' ]"
                                v-bind:type="[password_check == true ? 'password' : 'text']"
                                @input="member.password = $event.target.value">
                        </ValidationProvider>
                        <span v-bind:class="[password_check == true ? 'el_inputPass_icon' : 'el_inputPass_icon--show']" @click="look_password()"></span>
                    </div>
                    <span class="warning">※ 8文字以上で入力してください。</span>
                    <label class="el_label el_label-check el_label--required" for="password-check">パスワード確認:</label>
                    <div clas="el_inputPass_wrapper">
                        <ValidationProvider v-slot="{ errors }" rules="required|confirmed:confirmation|min:8">
                            <input type="el_inputPass hp_mb10p" id="password-check" class="pass-check-inp"
                                :value="member.password"
                                v-bind:class="[ errors.length > 0 ? 'error' : '' ]"
                                v-bind:type="[password_recheck == true ? 'password' : 'text']"
                                @input="member.re_password = $event.target.value">
                        </ValidationProvider>
                        <span v-bind:class="[password_recheck == true ? 'el_inputPass_icon' : 'el_inputPass_icon--show']" @click="look_repassword()"></span>
                    </div>
                    <div class="entry-btn-area">
                        <button id="submit"  class="el_btn el_btn--blue" @click="createMember()">登録</button>
                    </div>
                </from>
            </div>
        </ValidationObserver>
        <div class="bl_model_wrapper" id="modal_description" aria-hidden="true" v-bind:class="{is_active: isErrApi}">
            <div class="bl_model_overlay" tabindex="-1" data-micromodal-close="modal_description">
                <div class="bl_model">
                <p class="bl_model_head">エラー</p>
                <div class="bl_model_body">
                    <div class="bl_newsMedia-unit">
                    <div class="premodal">
                        <div class="premodal_text">
                        {{apiErrMessage}}
                        </div>
                    </div>
                    </div>
                </div>
                <buttton class="el_btn el_btn--grey" @click="closedescription()" data-micromodal-close="modal_description">閉じる</buttton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SystemApi from "~/models/apis/system";

@Component
export default class profile extends Vue {
    member:any = {
        name: '',
        password: '',
        re_password: '',
        token: ''
    }
    password_check:boolean = true;
    password_recheck:boolean = true;
    isErrApi:boolean = false;
    apiErrMessage:string = "";



    async created() {
        let params = this.getParams(location.search)
        //トークンが存在しなければ仮登録ページに遷移
        if(params.token == undefined) {
            this.$router.push("/registration/")
        }
        //認証結果
        let response = await SystemApi.emailVerification(params.token)
        if(response.status == 401) {
            alert(response.message)
            this.$router.push("/registration/")
            return
        }
        this.member.email = response.data.email
        this.member.token = params.token
    }

    async createMember() 
    {
        if(this.member.email && this.member.password && this.member.token && this.member.name) {
            try {
                let response = await SystemApi.definitiveRegistration(
                    this.member.email,
                    this.member.password,
                    this.member.token,
                    this.member.name
                );
                if(!response.result) {
                    this.apiErrMessage = response.message;
                    this.isErrApi = true;
                    return
                }  
            }catch (e){
                this.apiErrMessage = '登録時にエラーが発生しました。';
                this.isErrApi = true;
                return
            }
        }else {
            this.apiErrMessage = '登録時にエラーが発生しました。';
            this.isErrApi = true;
            return
        }
        const response = await this.$auth.loginWith('local', { data: {
                mail: this.member.email,
                password: this.member.password,
                remember: true
            }
        });
        try {
            console.log(response);
            localStorage.setItem('mail.local', this.member.email);
            localStorage.setItem('password.local', this.member.password);

            this.$router.push('/home');
        } catch(e) {
            this.apiErrMessage = '登録時にエラーが発生しました。';
            this.isErrApi = true;
            return
        }
    }
    getParams = (params: string): { [key: string]: string } => {
        const paramsArray = params.slice(1).split('&')
        const paramsObject: { [key: string]: string } = {}
        paramsArray.forEach(param => {
            paramsObject[param.split('=')[0]] = param.split('=')[1]
        });
        return paramsObject;
    }

    look_password() {
        this.password_check = !this.password_check;
        return this.password_check;
    }

    look_repassword() {
        this.password_recheck = !this.password_recheck;
        return this.password_recheck;
    }
}
</script>
<style lang="scss">
    .ly_conts {
        max-width: 600px;
        margin: 0 auto;
    }
    .bl_pageTtl {
        text-align: center;
    }
    .el_label {
        display: grid;
        font-size: 18px;
    }
    .nickname-inp {
        width: 295px;
        height: 30px;
        margin-bottom: 25px;
    }
    .pass-inp {
        width: 295px;
        height: 30px;
    }
    .pass-check-inp {
        width: 295px;
        height: 30px;
    }
    .warning {
        color: #FF0000;
    }
    .el_btn--blue {
        width: 200px;
        height: 35px;
        border: none;
        background: #0000FF;
        color: #fff;
        margin-top: 50px;
    }
    .contents {
        display: flex;
        justify-content: center;
    }
    .entry-btn-area {
        display: flex;
        justify-content: center;
    }
    .el_label-check {
        margin-top: 20px;
    }
</style>