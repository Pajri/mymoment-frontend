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
            <b-form-textarea id="textarea-rows" placeholder="How was your day ?" rows="5" @keyup="countCharacter" v-model="postText" :state="postText.length <= this.maxChar" required></b-form-textarea>
            <div class="d-flex flex-row justify-content-end post-meta-container">
                <b-button variant="success" class="align-self-center input-image" @click="onUploadClick">
                    <b-icon icon="card-image"></b-icon>
                </b-button>
                <input type="file" ref="frmImage" class="form-image-upload" @change="onFileSelect" :accept="accept">
                <span class="align-self-center mr-auto">{{fileName}}</span>

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
            fileName: "",
            showAlert: false,
            errorMessage: [],
            disableButtonPost: false,
            allowedFileExtension: ['.bmp', '.gif', '.jpeg', '.jpg', '.png', '.tiff'],
            accept: "",
            imageUrl: "",
        };
    },
    mounted() {
        this.accept = this.allowedFileExtension.join(",");
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

            if (this.$refs.frmImage.files.length > 0) {
                this.postContentWithImage();
            } else {
                this.postContent();
            }

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
            this.fileName = "";
            this.$refs.frmImage.value = "";
            this.charCount = this.maxChar;
        },
        onUploadClick(evt) {
            evt.preventDefault();
            this.$refs.frmImage.click()
        },
        onFileSelect(evt) {
            const file = evt.target.files;
            if (file.length > 0) {
                //get file extension
                let filename = file[0].name;
                const ext = "." + filename.split(".").pop();

                //validate allowed file extenison
                if (this.allowedFileExtension.includes(ext)) {
                    this.fileName = file[0].name;
                } else {
                    this.showErrorMessage(['File type is not allowed.']);
                    this.$refs.frmImage.value = '';
                }
            }
        },
        postContent() {
            const postURL = process.env.VUE_APP_API_HOST + "/api/post";

            const data = new FormData();
            data.append('content', this.postText);
            if (this.$refs.frmImage.files.length > 0) {
                data.append('image_url', this.imageUrl);
            }

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
                        this.imageUrl = response.data.image_url;
                        this.clearForm();
                    }
                })
                .catch((error) => {
                    this.showErrorMessage(error.response.data.message);
                })
                .finally(() => this.disableButtonPost = false)
        },
        postContentWithImage() {
            const uploadImageURL = process.env.VUE_APP_API_HOST + "/api/image";

            const data = new FormData()
            data.append("image", this.$refs.frmImage.files[0]);

            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': localStorage.JWT
                }
            };

            let self = this;
            axios
                .post(uploadImageURL, data, config)
                .then((response) => {
                    if (response.status == 200) {
                        self.imageUrl = response.data.image_url;
                    }
                })
                .then(() => {
                    self.postContent();
                })
                .catch((error) => {
                    self.showErrorMessage(error.response.data.message);
                    self.disableButtonPost = false;
                })
        }
    },
};
</script>
