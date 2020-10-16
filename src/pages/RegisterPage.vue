<template>
<div>
    <b-container>
        <div class="login-container" v-if="showRegister">
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                Dismissible Alert!
            </b-alert>
            <b-form @submit="onRegisterSubmit">
                <b-form-group id="input-group-full-name">
                    <b-form-input id="txt_full_name" v-model="form.fullName" type="text" required placeholder="Enter full name"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-password">
                    <b-form-input type="password" id="txt_password" v-model="form.password" required placeholder="Enter password"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-password-confirmation">
                    <b-form-input type="password" id="txt_password_confirmation" v-model="form.passwordConfirmation" required placeholder="Confirm password"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Register</b-button>

                <!--read more about google login at https://www.npmjs.com/package/vue-google-login -->
                <GoogleLogin :params="googleLoginParams" :renderParams="goggleLoginRenderParams"></GoogleLogin>
            </b-form>
        </div>

        <div class="login-container" v-if="showConfirmation">
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                Dismissible Alert!
            </b-alert>
            <b-form @submit="onOtpSubmit">
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="form.email" type="email" disabled></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-password-confirmation">
                    <b-form-input type="number" id="txt_number" v-model="form.otp" required placeholder="Confirm password"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>

                <!--read more about google login at https://www.npmjs.com/package/vue-google-login -->
                <GoogleLogin :params="googleLoginParams" :renderParams="goggleLoginRenderParams"></GoogleLogin>
            </b-form>
        </div>
    </b-container>
</div>
</template>

<script>
import {
    BAlert,
    BContainer
} from "bootstrap-vue";

import {
    GoogleLogin
} from "vue-google-login";

export default {
    name: "LoginPage",
    data() {
        return {
            form: {
                full_name: "",
                email: "",
                password: "",
                txt_password_confirmation: "",
                otp: 0,
            },
            googleLoginParams: {
                client_id: "xxxxxx",
            },
            // only needed if you want to render the button with the google ui
            goggleLoginRenderParams: {
                width: 250,
                height: 50,
                longtitle: true,
            },
            showDismissibleAlert: true,
            showRegister: true,
            showConfirmation: false,
        };
    },
    components: {
        BAlert,
        BContainer,
        GoogleLogin,
    },
    methods: {
        onRegisterSubmit(evt) {
            evt.preventDefault()
            this.showRegister = false
            this.showConfirmation = true
        },
        onOtpSubmit(evt) {
            evt.preventDefault()
            window.location.href = 'login'
        }
    },
};
</script>
