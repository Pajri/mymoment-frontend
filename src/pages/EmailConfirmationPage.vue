<template>
<div>
    <b-container>
        <div class="login-container">
            <div v-if="showConfirmed">
                Email is confirmed successfully. <br />
                <a href="/login">Go to login page</a>
            </div>

            <div v-if="showNotConfirmed">
                Email confirmation unsuccesful. <br />
                Message : {{ errorMessage }}
            </div>
        </div>
    </b-container>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: "EmailConfirmationPage",
    data() {
        return {
            isTokenValid: false,
            showConfirmed: false,
            showNotConfirmed: false,
            errorMessage: "",
        };
    },
    created() {
        let token = this.$route.query.token;
        let emailConfUrl =
            process.env.VUE_APP_API_HOST + "/api/auth/verify_email?token=" + token;

        axios
            .get(emailConfUrl)
            .then((response) => {
                if (response.status == 200) {
                    this.showConfirmed = true;
                    this.showNotConfirmed = false;
                }
            })
            .catch((error) => {
                this.errorMessage = error.response.data.message;
                this.showConfirmed = false;
                this.showNotConfirmed = true;
            });
    },
};
</script>
