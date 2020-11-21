<template>
  <b-container
    class="email-confirmation-page py-3 d-flex align-items-center"
    fluid
  >
    <div class="p-5 mx-auto text-white account-form-container">
      <h3 v-if="showConfirmed || showNotConfirmed">Email Confirmation</h3>
      <hr />
      <div v-if="showConfirmed">
        <p>Email is confirmed successfully.</p>
        <b-link href="/login">Go to login page</b-link>
      </div>

      <div v-if="showNotConfirmed">
        <p>Email confirmation unsuccesful.</p>
        <b-alert variant="danger" class="rounded-0 p-3" show>{{ errorMessage }}</b-alert>
      </div>
      <Loading v-if="!(showConfirmed || showNotConfirmed)" class="my-3 text-white"></Loading>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import { generateErrorMessageFromResponse } from "@/module/axios_util"

import Loading from "../components/Loading.vue";

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
  components: {
    Loading
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
        if (error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = generateErrorMessageFromResponse(error);
        }
        this.showConfirmed = false;
        this.showNotConfirmed = true;
      });
  },
};
</script>
