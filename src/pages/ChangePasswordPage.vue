<template>
<div class="login-container">
    <b-form @submit="onNewPasswordSubmit">
        <b-form-group id="input-group-new-password">
            <b-form-input type="password" v-model="form.newPassword" required placeholder="Enter new password" :disabled="passwordDisabled"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-confirm-password">
            <b-form-input type="password" v-model="form.confirmPassword" required placeholder="Confirm new password" :disabled="passwordDisabled"></b-form-input>
        </b-form-group>

        <b-alert variant="success" v-model="showSuccessAlert">
            Password has been successfully changed. <br>
            <b-link href="/login">Go to login page</b-link>
        </b-alert>
        <b-alert v-model="showError" variant="danger" dismissible>
            <ul>
                <li v-for="m in this.errorMessage" :key="m">
                    {{m}}
                </li>
            </ul>
        </b-alert>

        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</div>
</template>

<script>
import axios from "axios";
import {
    ERROR_MESSAGE
} from "@/module/const"

export default {
    name: "ChangePasswordPage",
    data() {
        return {
            form: {
                newPassword: "",
                confirmPassword: ""
            },
            showError: false,
            showSuccessAlert: false,
            errorMessage: [],
            passwordDisabled: false,
        }
    },
    methods: {
        onNewPasswordSubmit(evt) {
            evt.preventDefault();
            this.showSuccessAlert = false;
            this.hideErrorAlert();

            const token = this.$route.query.token;
            const changePasswordUrl = process.env.VUE_APP_API_HOST + "/api/auth/change_password?token=" + token;
            const data = {
                "password": this.form.newPassword,
                "password_confirmation": this.form.confirmPassword,
            }

            axios.post(changePasswordUrl, data)
                .then((response) => {
                    if (response.status === 200) {
                        this.showSuccessAlert = true;
                        this.passwordDisabled = true;
                    }
                })
                .catch((error) => {
                    if (error.response.data.message) {
                        this.showErrorAlert(error.response.data.message);
                    } else {
                        this.showErrorAlert([ERROR_MESSAGE]);
                    }
                })
        },
        showErrorAlert(message) {
            this.errorMessage = message;
            this.showError = true;
        },
        hideErrorAlert() {
            this.errorMessage = [];
            this.showError = false;
        },
    }
}
</script>
