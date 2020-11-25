<template>
  <b-container class="change-password-page py-3 d-flex align-items-center" fluid>
    <b-row class="flex-fill">
      <b-col lg="4"></b-col>
      <b-col lg="4">
        <div class="account-form-container p-3">
          <h3>Change Password</h3>
          <hr />

          <b-form @submit="onNewPasswordSubmit">
            <b-input-group class="my-3">
              <b-input-group-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-text>
              <b-form-input
                type="password"
                v-model="form.newPassword"
                required
                placeholder="Enter new password"
                :disabled="passwordDisabled"
              ></b-form-input>
            </b-input-group>

            <b-input-group class="my-3">
              <b-input-group-text>
                <b-icon icon="check-circle-fill"></b-icon>
              </b-input-group-text>
              <b-form-input
                type="password"
                v-model="form.confirmPassword"
                required
                placeholder="Confirm new password"
                :disabled="passwordDisabled"
              ></b-form-input>
            </b-input-group>

            <Loading v-if="showLoading" class="my-3 text-white"></Loading>

            <b-alert
              variant="success"
              v-model="showSuccessAlert"
              class="rounded-0"
            >
              Password has been successfully changed. <br />
              <b-link href="/login">Go to login page</b-link>
            </b-alert>
            <error-message
              :errorMessage="this.errorMessage"
              :showAlert="showError"
              @onDismissed="hideErrorAlert"
            ></error-message>

            <b-button type="submit">Submit</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col lg="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { generateErrorMessageFromResponse } from "@/module/axios_util"
import {removeAccessToken} from "@/module/auth_util"

import ErrorMessage from "../components/ErrorMessage.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "ChangePasswordPage",
  data() {
    return {
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      showError: false,
      showSuccessAlert: false,
      errorMessage: [],
      passwordDisabled: false,
      showLoading: false,
    };
  },
  components: {
    ErrorMessage,
    Loading,
  },
  methods: {
    onNewPasswordSubmit(evt) {
      evt.preventDefault();
      this.showSuccessAlert = false;
      this.hideErrorAlert();
      this.showLoading = true;

      const token = this.$route.query.token;
      const changePasswordUrl =
        process.env.VUE_APP_API_HOST +
        "/api/auth/change_password?token=" +
        token;
      const data = {
        password: this.form.newPassword,
        password_confirmation: this.form.confirmPassword,
      };

      axios
        .post(changePasswordUrl, data)
        .then((response) => {
          if (response.status === 200) {
            this.showSuccessAlert = true;
            this.passwordDisabled = true;
            removeAccessToken();

          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            this.showErrorAlert(error.response.data.message);
          } else {
            const message = generateErrorMessageFromResponse(error);
            this.showErrorAlert([message]);
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    showErrorAlert(message) {
      this.errorMessage = message;
      this.showError = true;
    },
    hideErrorAlert() {
      this.errorMessage = [];
      this.showError = false;
    },
  },
};
</script>
