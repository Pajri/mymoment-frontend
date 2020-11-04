<template>
<div>
    <b-container>
        <div class="login-container" v-if="showRegister">
            <b-alert v-model="showRegAlert" variant="danger" dismissible>
                <ul>
                    <li v-for="m in this.registerAlertMessage" :key="m">
                        {{m}}
                    </li>
                </ul>
            </b-alert>
            <b-form @submit="onRegisterSubmit">
                <b-form-group id="input-group-full-name">
                    <b-form-input id="txt_full_name" v-model="registrationForm.fullName" type="text" required placeholder="Enter full name"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="registrationForm.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>

                <b-form-group id="input-grou~p-password">
                    <b-form-input type="password" id="txt_password" ref="password" v-model="registrationForm.password" required placeholder="Enter password"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-password-confirmation">
                    <b-form-input type="password" id="txt_password_confirmation" v-model="registrationForm.passwordConfirmation" required placeholder="Confirm password"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Register</b-button>
            </b-form>
        </div>

        <div class="login-container" v-if="showRegSuccesfull">
            Registration successful ! <br />
            Please check your email to verify your email. <br>
            <a href="/login">Go to login page</a>
        </div>
    </b-container>
</div>
</template>

<script>
import axios from "axios";
import {
    BAlert,
    BContainer
} from "bootstrap-vue";

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
            showRegSuccesfull: false
        };
    },
    components: {
        BAlert,
        BContainer,
    },
    methods: {
        onRegisterSubmit(evt) {
            evt.preventDefault();
            this.cleanFormInput();

            let registrationValidation = this.validateRegistrationForm();
            if (!registrationValidation.isValid) {
                this.showRegistrationAlert(registrationValidation.message);
                return;
            }

            /*start prepare request*/
            var registerUrl = process.env.VUE_APP_API_HOST + "/api/auth/signup";
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            var data = new URLSearchParams();
            data.append('full_name', this.registrationForm.fullName);
            data.append('email', this.registrationForm.email);
            data.append('password', this.registrationForm.password);
            data.append('confirm_password', this.registrationForm.passwordConfirmation);
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
                        console.error("undefined status code : " + response.status)
                    }

                })
                .catch(function (error) {
                    self.showRegistrationAlert(error.response.data.message)
                });
            /*end request execution*/

        },
        onOtpSubmit(evt) {
            evt.preventDefault();
            window.location.href = "login";
        },
        validateRegistrationForm() {
            let isValid = true;
            let message = []
            //validate password confirmation
            if (
                this.registrationForm.password !=
                this.registrationForm.passwordConfirmation
            ) {
                isValid = false;
                message.push("Password confirmation does not match.");
            }

            //validate password length
            if (this.registrationForm.password.length < 10) {
                isValid = false;
                message.push("Password length minimum 10 characters.")
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
        }
    }
};
</script>
