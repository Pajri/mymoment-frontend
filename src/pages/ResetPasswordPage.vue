<template>
<div>
    <b-container>
        <div class="account-form-container">
            <p>Please enter your email. The reset password link will be sent to your email.</p>
            <b-form @submit="onResetPasswordSubmit">
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="resetForm.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>
                <b-alert variant="success" v-model="showResetSuccess">Reset password link is sent to your email.</b-alert>

                <b-alert v-model="showResetError" variant="danger" dismissible>
                    <ul>
                        <li v-for="m in this.resetErrorMessage" :key="m">
                            {{m}}
                        </li>
                    </ul>
                </b-alert>

                <b-button type="submit" variant="primary">Reset password</b-button>
            </b-form>
        </div>
    </b-container>
</div>
</template>

<script>
import axios from "axios";
import {
    ERROR_MESSAGE
} from "@/module/const";

import {
    BAlert,
    BContainer
} from "bootstrap-vue";

export default {
    name: "LoginPage",
    data() {
        return {
            resetForm: {
                email: "",
            },
            showResetSuccess: false,
            showResetError: false,
            resetErrorMessage: [],
        };
    },
    components: {
        BAlert,
        BContainer
    },
    methods: {
        onResetPasswordSubmit(evt) {
            evt.preventDefault();
            this.hideResetErrorAlert();
            this.showResetSuccess = false;

            const resetPasswordUrl = process.env.VUE_APP_API_HOST + "/api/auth/reset_password/";
            const data = {
                "email": this.resetForm.email
            }

            axios.post(resetPasswordUrl, data)
                .then((response) => {
                    if (response.status === 200) {
                        this.showResetSuccess = true;
                    }
                }).catch((error) => {
                    if (error.response.data.message) {
                        this.showResetErrorAlert(error.response.data.message);
                    } else {
                        this.showResetErrorAlert([ERROR_MESSAGE]);
                    }
                })
        },
        showResetErrorAlert(message) {
            this.resetErrorMessage = message;
            this.showResetError = true;
        },
        hideResetErrorAlert() {
            this.resetErrorMessage = [];
            this.showResetError = false;
        },

    },
};
</script>
