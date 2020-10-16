<template>
<div>
    <b-container>
        <div class="login-container" v-if="showResetPassword">
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                Dismissible Alert!
            </b-alert>
            <b-form @submit="onResetPasswordSubmit">
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>
                <b-alert variant="success" show>Reset password link is sent to your email.</b-alert>

                <b-button type="submit" variant="primary">Reset password</b-button>
            </b-form>
        </div>

        <div class="login-container" v-if="showNewPassword">
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                Dismissible Alert!
            </b-alert>
            <b-form @submit="onNewPasswordSubmit">
                <b-form-group id="input-group-new-password">
                    <b-form-input type="password" id="txt_new_password" v-model="form.newPassword" required placeholder="Enter new password"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-confirm-password">
                    <b-form-input type="password" id="txt_new_password" v-model="form.confirmPassword" required placeholder="Confirm new password"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
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

export default {
    name: "LoginPage",
    data() {
        return {
            form: {
                newPassword: "",
                confirmPassword: ""
            },
            showResetPassword: true,
            showNewPassword: false
        };
    },
    components: {
        BAlert,
        BContainer
    },
    methods: {
        onResetPasswordSubmit(evt) {
            evt.preventDefault();

            this.showResetPassword = false
            this.showNewPassword = true
        },
        onNewPasswordSubmit(evt) {
            evt.preventDefault();

            window.location.href = 'login'
        }
    },
};
</script>
