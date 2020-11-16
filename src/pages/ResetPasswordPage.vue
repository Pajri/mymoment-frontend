<template>
  <b-container class="reset-password-page py-3 d-flex align-items-center" fluid>
    <b-row class="flex-fill">
      <b-col lg="4"></b-col>
      <b-col lg="4">
        <div class="account-form-container p-3">
          <h3>Reset Password</h3>
          <hr />
          <p class="text-white">
            Please enter your email. A reset password link will be sent to your
            email.
          </p>

          <b-form @submit="onResetPasswordSubmit">
            <b-input-group class="my-3">
              <b-input-group-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-text>
              <b-form-input
                v-model="resetForm.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-input-group>

            <b-alert variant="success" class="rounded-0" v-model="showResetSuccess"
              >Reset password link is sent to your email.</b-alert
            >
            <error-message
              :errorMessage="this.resetErrorMessage"
              v-if="showResetError"
            ></error-message>

            <Loading v-if="showLoading" class="my-3 text-white"></Loading>

            <b-button type="submit">Reset password</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col lg="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { ERROR_MESSAGE } from "@/module/const";

import { BAlert, BContainer } from "bootstrap-vue";

import ErrorMessage from "../components/ErrorMessage.vue";
import Loading from "../components/Loading.vue";

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
      showLoading: false,
    };
  },
  components: {
    BAlert,
    BContainer,
    ErrorMessage,
    Loading,
  },
  methods: {
    onResetPasswordSubmit(evt) {
      evt.preventDefault();
      this.hideResetErrorAlert();
      this.showResetSuccess = false;
      this.showLoading = true;

      const resetPasswordUrl =
        process.env.VUE_APP_API_HOST + "/api/auth/reset_password/";
      const data = {
        email: this.resetForm.email,
      };

      axios
        .post(resetPasswordUrl, data)
        .then((response) => {
          if (response.status === 200) {
            this.showResetSuccess = true;
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            this.showResetErrorAlert(error.response.data.message);
          } else {
            this.showResetErrorAlert([ERROR_MESSAGE]);
          }
        })
        .finally(()=>{
          this.showLoading = false;
        });
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
