<template>
<div>
    <b-container>
        <div class="login-container">
            <b-alert v-model="showAlert" variant="danger" dismissible>
                <ul>
                    <li v-for="m in this.errorMessage" :key="m">
                        {{m}}
                    </li>
                </ul>
            </b-alert>
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-password">
                    <b-form-input type="password" id="txt_password" v-model="form.password" required placeholder="Enter password"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Login</b-button>
            </b-form>
        </div>
    </b-container>
</div>
</template>

<script>
import axios from "axios";
import {
    validatePassword
} from "@/module/validation";

import {
    BAlert,
    BContainer
} from "bootstrap-vue";

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
        };
    },
    components: {
        BAlert,
        BContainer,
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.cleanInput();

            let loginValidation = this.validateForm();
            if (!loginValidation.isValid) {
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
                        localStorage.JWT = accessToken;

                        this.showAlert = false;
                        this.errorMessage = [];

                        this.$router.push('/');
                    }
                })
                .catch((error) => {
                    this.showErrorAlert(error.response.data.message);
                });
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
    },
};
</script>
