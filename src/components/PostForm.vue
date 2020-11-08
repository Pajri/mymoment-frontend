<template>
<div>
    <b-alert v-model="showAlert" dismissible variant="danger" class="post-form-alert">
        <ul>
            <li v-for="m in this.errorMessage" :key="m">
                {{m}}
            </li>
        </ul>
    </b-alert>
    <div class="post-editor-container bg-secondary">
        <b-form @submit="onSubmit">
            <b-form-textarea id="textarea-rows" placeholder="How was your day ?" rows="5" @keyup="countCharacter" v-model="postText" :state="postText.length <= this.maxChar"></b-form-textarea>
            <div class="d-flex flex-row justify-content-end post-meta-container">
                <b-button variant="success" class="mr-auto align-self-center">
                    <b-icon icon="card-image"></b-icon>
                </b-button>

                <span class="align-self-center">{{ charCount }}</span>
                <b-button type="submit" variant="success" :disabled='disableButtonPost'>Post !</b-button>
            </div>
        </b-form>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    BIcon
} from "bootstrap-vue";

export default {
    components: {
        BIcon,
    },
    data() {
        return {
            maxChar: 500,
            charCount: 500,
            postText: "",
            showAlert: false,
            errorMessage: [],
            disableButtonPost: false,
        };
    },
    methods: {
        countCharacter() {
            this.charCount = this.maxChar - this.postText.length;
            if (this.postText.length > this.maxChar) {
                this.showErrorMessage(["The maximum text is " + this.maxChar + " characters"]);
            } else {
                this.hideErrorMessage();
            }
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.cleanInput();
            this.hideErrorMessage();
            this.disableButtonPost = true;

            const postURL = process.env.VUE_APP_API_HOST + "/api/post";

            const data = new URLSearchParams()
            data.append("content", this.postText);

            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': localStorage.JWT
                }
            };

            axios
                .post(postURL, data, config)
                .then((response) => {
                    if (response.status == 201) {
                        this.clearForm();
                    }
                })
                .catch((error) => {
                    this.showErrorMessage(error.response.data.message);
                })
                .finally(() => this.disableButtonPost = false)

        },
        cleanInput() {
            this.postText = this.postText.trim();
        },
        showErrorMessage(message) {
            this.errorMessage = this.errorMessage.concat(message);
            this.showAlert = true;
        },
        hideErrorMessage() {
            this.errorMessage = [];
            this.showAlert = false;
        },
        clearForm() {
            this.postText = "";
        }
    },
};
</script>
