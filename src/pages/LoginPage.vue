<template>
<b-container fluid class="login-page text-white">
    <b-row align-v="center">
        <b-col lg="8" class="text-center">
            <h1 class="display-1 d-none d-lg-block">My Moment</h1>
            <h1 class="display-3 d-block d-lg-none">My Moment</h1>
        </b-col>
        <b-col lg="3" class="d-flex flex-column justify-content-center form-section">
            <div class="login-form">
                <error-message :errorMessage="this.errorMessage" :showAlert="showAlert" @onDismissed="hideErrorAlert"></error-message>
                <b-form @submit="onSubmit">
                    <b-input-group class="my-3">
                        <b-input-group-text>
                            <b-icon icon="person-fill"></b-icon>
                        </b-input-group-text>
                        <b-form-input v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
                    </b-input-group>

                    <b-input-group class="my-3">
                        <b-input-group-text>
                            <b-icon icon="lock-fill"></b-icon>
                        </b-input-group-text>
                        <b-form-input type="password" v-model="form.password" required placeholder="Enter password"></b-form-input>
                    </b-input-group>

                    <Loading v-if="showPleaseWait"></Loading>

                    <div class="control-wrapper d-flex my-3">
                        <b-button type="submit" variant="primary">Login</b-button>
                        <b-link href="/reset_password" class="align-self-center ml-auto">Forgot password</b-link>
                    </div>

                    <p class="my-3">Dont have account ? <b-link href="/register">Register</b-link>
                    </p>

                </b-form>
            </div>
        </b-col>
        <b-col lg="1">
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import axios from "axios";
import { generateErrorMessageFromResponse } from "@/module/axios_util"

import {
    saveAccessToken
} from "@/module/auth_util"

import {
    validatePassword
} from "@/module/validation";

import {
    BContainer
} from "bootstrap-vue";

import ErrorMessage from '../components/ErrorMessage.vue';
import Loading from '../components/Loading.vue';

export default {
    name: "LoginPage",
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            showAlert: false,
            errorMessage: [],
            showPleaseWait: false,
        };
    },
    components: {
        BContainer,
        ErrorMessage,
        Loading,
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.showPleaseWait = true;
            this.cleanInput();
            this.hideErrorAlert();

            let loginValidation = this.validateForm();
            if (!loginValidation.isValid) {
                this.showPleaseWait = false;
                this.showErrorAlert(loginValidation.message);
                return;
            }

            const loginURL = process.env.VUE_APP_API_HOST + "/api/auth/login";

            const data = new URLSearchParams();
            data.append("email", this.form.email);
            data.append("password", this.form.password);

            const config = {
                withCredentials: true
            };

            axios
                .post(loginURL, data, config)
                .then((response) => {
                    if (response.status === 200) {
                        let data = response.data;
                        let accessToken = data.access_token;
                        saveAccessToken(accessToken);

                        this.hideErrorAlert();
                        this.showPleaseWait = false;

                        this.$router.push('/');

                    }
                })
                .catch((error) => {
                    if (error.response.data.message) {
                        this.showErrorAlert(error.response.data.message);
                    } else {
                        const message = generateErrorMessageFromResponse(error);
                        this.showErrorAlert([message]);
                    }
                })
                .finally(() => this.showPleaseWait = false);
        },
        cleanInput() {
            this.form.email = this.form.email.trim();
            this.form.password = this.form.password.trim();
        },
        validateForm() {
            let isValid = true;
            let message = [];

            const vPassword = validatePassword(this.form.password)
            if (!vPassword.isValid) {
                isValid = false;
                message = message.concat(vPassword.message)
            }

            return {
                isValid: isValid,
                message: message,
            };
        },
        showErrorAlert(message) {
            this.showAlert = true;
            this.errorMessage = message;
        },
        hideErrorAlert(){
            this.showAlert = false;
            this.errorMessage = [];
        }
    },
};
</script>
