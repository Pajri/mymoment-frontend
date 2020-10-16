<template>
<div>
    <b-container>
        <div class="login-container">
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                Dismissible Alert!
            </b-alert>
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-email">
                    <b-form-input id="txt_email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-password">
                    <b-form-input type="password" id="txt_password" v-model="form.password" required placeholder="Enter password"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Login</b-button>

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
                email: "",
                password: "",
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
        };
    },
    components: {
        BAlert,
        BContainer,
        GoogleLogin,
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            alert(JSON.stringify(this.form));
        },
    },
};
</script>
