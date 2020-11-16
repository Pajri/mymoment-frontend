<template>
<b-container class="registration-page py-3 d-flex align-items-center" fluid>
    <b-row v-if="showRegister" class="flex-fill">
        <b-col lg="4"></b-col>
        <b-col lg="4">
            
            <div class="account-form-container p-3">
                <h3>Register</h3>
                <hr>
                <error-message :errorMessage="this.registerAlertMessage" v-if="showRegAlert"></error-message>
                <b-form @submit="onRegisterSubmit">
                    <b-input-group class="my-3">
                        <b-input-group-text>
                            <b-icon icon="person-fill"></b-icon>
                        </b-input-group-text>
                        <b-form-input v-model="registrationForm.fullName" type="text" required placeholder="Enter full name"></b-form-input>
                    </b-input-group>

                    <b-input-group class="my-3">
                        <b-input-group-text>
                            <b-icon icon="envelope"></b-icon>
                        </b-input-group-text>
                        <b-form-input v-model="registrationForm.email" type="email" required placeholder="Enter email"></b-form-input>
                    </b-input-group>

                    <b-input-group class="my-3">
                        <b-input-group-text>
                            <b-icon icon="lock-fill"></b-icon>
                        </b-input-group-text>
                        <b-form-input type="password" ref="password" v-model="registrationForm.password" required placeholder="Enter password"></b-form-input>
                    </b-input-group>

                    <b-input-group class="my-3">
                        <b-input-group-text>
                            <b-icon icon="check-circle-fill"></b-icon>
                        </b-input-group-text>
                        <b-form-input type="password" v-model="registrationForm.passwordConfirmation" required placeholder="Confirm password"></b-form-input>
                    </b-input-group>
                    <Loading v-if="showLoading" class="my-3 text-white"></Loading>
                    <b-button type="submit">Register</b-button>
                </b-form>
            </div>
        </b-col>
        <b-col lg="4"></b-col>
    </b-row>

    <div class="account-form-container" v-if="showRegSuccesfull">
        Registration successful ! <br />
        Please check your email to verify your email. <br />
        <a href="/login">Go to login page</a>
    </div>
</b-container>
</template>

<script>
import axios from "axios";
import {
    ERROR_MESSAGE
} from "@/module/const";

import {
    validatePassword,
    validatePasswordConfirmation,
    validateFullName,
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
            registrationForm: {
                fullName: "",
                email: "",
                password: "",
                passwordConfirmation: "",
            },
            registerAlertMessage: [],
            showRegAlert: false,
            showRegister: true,
            showRegSuccesfull: false,
            showLoading: false,
        };
    },
    components: {
        BContainer,
        ErrorMessage,
        Loading,
    },
    methods: {
        onRegisterSubmit(evt) {
            evt.preventDefault();
            this.cleanFormInput();
            this.showLoading = true;

            let registrationValidation = this.validateRegistrationForm();
            if (!registrationValidation.isValid) {
                this.showRegistrationAlert(registrationValidation.message);
                return;
            }

            /*start prepare request*/
            let registerUrl = process.env.VUE_APP_API_HOST + "/api/auth/signup";
            let config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            let data = new URLSearchParams();
            data.append("full_name", this.registrationForm.fullName);
            data.append("email", this.registrationForm.email);
            data.append("password", this.registrationForm.password);
            data.append(
                "confirm_password",
                this.registrationForm.passwordConfirmation
            );
            /*end prepare request*/

            /*start request execution*/
            var self = this;
            axios
                .post(registerUrl, data, config)
                .then((response) => {
                    if (response.status == 201) {
                        self.showRegister = false;
                        self.showRegSuccesfull = true;
                    } else {
                        console.error("undefined status code : " + response.status);
                    }
                })
                .catch(function (error) {
                    if (error.response.data.message) {
                        self.showRegistrationAlert(error.response.data.message);
                    } else {
                        self.showRegistrationAlert([ERROR_MESSAGE]);
                    }
                })
                .finally(() => {
                    self.showLoading = false;
                });
            /*end request execution*/
        },
        validateRegistrationForm() {
            let isValid = true;
            let message = [];

            const regForm = this.registrationForm;
            const vFullName = validateFullName(regForm.fullName);
            if (!vFullName.isValid) {
                isValid = false;
                message = message.concat(vFullName.message);
            }

            const vPassConfirm = validatePasswordConfirmation(
                regForm.password,
                regForm.passwordConfirmation
            );
            if (!vPassConfirm.isValid) {
                isValid = false;
                message = message.concat(vPassConfirm.message);
            }

            const vPassword = validatePassword(regForm.password);
            if (!vPassword.isValid) {
                isValid = false;
                message = message.concat(vPassword.message);
            }

            return {
                isValid: isValid,
                message: message,
            };
        },
        showRegistrationAlert(val) {
            this.showRegAlert = true;
            this.registerAlertMessage = val;
        },
        cleanFormInput() {
            this.registrationForm.fullName = this.registrationForm.fullName.trim();
            this.registrationForm.email = this.registrationForm.email.trim();
            this.registrationForm.password = this.registrationForm.password.trim();
            this.registrationForm.passwordConfirmation = this.registrationForm.passwordConfirmation.trim();
        },
    },
};
</script>
