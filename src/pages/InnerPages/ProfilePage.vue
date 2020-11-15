<template>
<div>
    <b-alert v-model="showError" dismissible variant="danger" class="post-form-alert">
        <ul>
            <li v-for="m in this.errorMessage" :key="m">
                {{m}}
            </li>
        </ul>
    </b-alert>
    <b-alert v-model="showSuccess" dismissible variant="success">{{successMessage}}</b-alert>

    <b-form @submit="onSubmit" v-if="true">
        <b-form-group label="Full Name:">
            <span v-if="!editMode">{{fullName}}</span>
            <b-form-input v-if="editMode" v-model="fullNameForm" type="text" required placeholder="Enter full name"></b-form-input>
        </b-form-group>

        <b-form-group label="Email:">
            <span>{{email}} </span>
        </b-form-group>

        <b-button @click="changePasswordClick">Change password</b-button> <br>

        <span v-if="showLoading">Loading...</span> <br />

        <b-button @click="editClick" v-if="!editMode">Edit</b-button>
        <b-button type="submit" v-if="editMode">Submit</b-button>
        <b-button @click="cancelClick" v-if="editMode">Cancel</b-button>
    </b-form>

</div>
</template>

<script>
import axios from "axios"
import {
    ERROR_MESSAGE
} from "@/module/const";

import {
    getAccessToken
} from "@/module/auth_util"

export default {
    name: "ProfilePage",
    data() {
        return {
            content: "",
            fullName: "",
            fullNameForm: "",
            email: "",
            editMode: false,
            errorMessage: [],
            showError: false,
            showLoading: false,
            successMessage: "",
            showSuccess: false,
        }
    },
    created() {
        const getProfileUrl = process.env.VUE_APP_API_HOST + "/api/profile"
        const config = {
            withCredentials: true,
            headers: {
                'Authorization': getAccessToken()
            }
        }

        axios.get(getProfileUrl, config)
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data
                    this.fullName = data.full_name;
                    this.fullNameForm = data.full_name;

                    this.email = data.email;
                }
                this.content = response;
            })
            .catch((error) => {
                if (error.response.data.message) {
                    this.showErrorMessage([error.response.data.message]);
                } else {
                    this.showErrorMessage([ERROR_MESSAGE]);
                }

            })
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.hideErrorMessage();
            this.hideSuccessAlert();
            this.showLoading = true;

            const editProfileUrl = process.env.VUE_APP_API_HOST + "/api/profile/update"
            const data = {
                "full_name": this.fullNameForm
            }
            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': getAccessToken()
                }
            }

            axios.post(editProfileUrl, data, config)
                .then((response) => {
                    if (response.status === 204) {
                        this.fullName = this.fullNameForm;
                        this.showSuccessAlert("Profile has been succesfully updated");
                        this.editMode = false;
                    }
                })
                .catch((error) => {
                    if (error.response.data.message) {
                        this.showErrorMessage(error.response.data.message);
                    } else {
                        this.showErrorMessage([ERROR_MESSAGE]);
                    }

                })
                .finally(() => {
                    this.showLoading = false;
                })
        },
        editClick() {
            this.editMode = true;
        },
        cancelClick() {
            this.fullNameForm = this.fullName;
            this.editMode = false;
        },
        showErrorMessage(message) {
            this.errorMessage = this.errorMessage.concat(message);
            this.showError = true;
        },
        hideErrorMessage() {
            this.errorMessage = [];
            this.showError = false;
        },
        showSuccessAlert(message) {
            this.successMessage = message;
            this.showSuccess = true;
        },
        hideSuccessAlert() {
            this.successMessage = "";
            this.showSuccess = false;
        },
        changePasswordClick(evt) {
            evt.preventDefault();
            this.hideErrorMessage();
            this.hideSuccessAlert();
            this.showLoading = true;

            const resetPasswordUrl = process.env.VUE_APP_API_HOST + "/api/auth/reset_password/";
            const data = {
                "email": this.email
            }

            axios.post(resetPasswordUrl, data)
                .then((response) => {
                    if (response.status === 200) {
                        this.showResetSuccess = true;
                        this.showSuccessAlert("A change password url has been sent to your email.");
                    }
                })
                .catch((error) => {
                    if (error.response.data.message) {
                        this.showErrorMessage(error.response.data.message);
                    } else {
                        this.showErrorMessage([ERROR_MESSAGE]);
                    }

                })
                .finally(() => {
                    this.showLoading = false;
                })

        }
    }
}
</script>
