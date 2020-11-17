<template>
  <div>
    <error-message
      :errorMessage="this.errorMessage"
      v-if="showAlert"
      class="post-form-alert"
    ></error-message>
    <div class="post-editor-container background-dark p-2">
      <b-form @submit="onSubmit">
        <b-form-textarea
          id="textarea-rows"
          class="rounded-0"
          placeholder="How was your day ?"
          rows="5"
          @keyup="countCharacter"
          v-model="postText"
          :state="postText.length <= this.maxChar"
          required
        ></b-form-textarea>
        <div class="d-flex flex-row justify-content-end post-meta-container">
          <div class="align-self-center mr-auto">
            <b-button
              class="input-image rounded-0 btn-upload-image border-0"
              @click="onUploadClick"
            >
              <b-icon icon="card-image"></b-icon>
            </b-button>
            <input
              type="file"
              ref="frmImage"
              class="form-image-upload"
              @change="onFileSelect"
              :accept="accept"
            />
            <small v-if="showImageLabel"
              >{{ fileName }}
              <b-icon
                icon="x-square-fill"
                class="button-icon"
                @click="clearImageField"
              ></b-icon>
            </small>
          </div>

          <Loading
            v-if="showLoading"
            class="align-self-center text-white"
          ></Loading>
          <span class="align-self-center">{{ charCount }}</span>
          <b-button
            type="submit"
            :disabled="disableButtonPost"
            class="rounded-0 border-0"
            >Post !</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ERROR_MESSAGE } from "@/module/const";

import { getAccessToken } from "@/module/auth_util";

import { BIcon } from "bootstrap-vue";

import ErrorMessage from "../components/ErrorMessage.vue";
import Loading from "../components/Loading.vue";

export default {
  components: {
    BIcon,
    ErrorMessage,
    Loading,
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
      allowedFileExtension: [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".tiff"],
      accept: "",
      imageUrl: "",
      showImageLabel: false,
      showLoading: false,
    };
  },
  mounted() {
    this.accept = this.allowedFileExtension.join(",");
  },
  methods: {
    countCharacter() {
      this.charCount = this.maxChar - this.postText.length;
      if (this.postText.length > this.maxChar) {
        this.showErrorMessage([
          "The maximum text is " + this.maxChar + " characters",
        ]);
      } else {
        this.hideErrorMessage();
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.cleanInput();
      this.hideErrorMessage();
      this.disableButtonPost = true;
      this.showLoading = true;

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
      this.charCount = this.maxChar;
      this.clearImageField();
    },
    clearImageField() {
      this.fileName = "";
      this.$refs.frmImage.value = "";
      this.showImageLabel = false;
    },
    onUploadClick(evt) {
      evt.preventDefault();
      this.$refs.frmImage.click();
    },
    onFileSelect(evt) {
      const file = evt.target.files;
      if (file.length > 0) {
        //validate file size
        if (file[0].size > 10485760) {
          this.showErrorMessage(["Maximum file size is 10 MB."]);
          return;
        }

        //get file extension
        let filename = file[0].name;
        const ext = "." + filename.split(".").pop();

        //validate allowed file extenison
        if (this.allowedFileExtension.includes(ext)) {
          this.fileName = file[0].name;
          this.showImageLabel = true;
        } else {
          this.showErrorMessage(["File type is not allowed."]);
          this.$refs.frmImage.value = "";
        }
      }
    },
    postContent() {
      const postURL = process.env.VUE_APP_API_HOST + "/api/post";

      const data = new FormData();
      data.append("content", this.postText);
      if (this.$refs.frmImage.files.length > 0) {
        data.append("image_url", this.imageUrl);
      }

      const config = {
        withCredentials: true,
        headers: {
          Authorization: getAccessToken(),
        },
      };

      axios
        .post(postURL, data, config)
        .then((response) => {
          if (response.status == 201) {
            this.imageUrl = response.data.image_url;
            this.clearForm();
            this.$emit("onPosted", response.data.post);
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
            this.disableButtonPost = false;
            this.showLoading = false;
        });
    },
    postContentWithImage() {
      const uploadImageURL = process.env.VUE_APP_API_HOST + "/api/image";

      const data = new FormData();
      data.append("image", this.$refs.frmImage.files[0]);

      const config = {
        withCredentials: true,
        headers: {
          Authorization: localStorage.JWT,
        },
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
          if (error.response.data.message) {
            self.showErrorMessage(error.response.data.message);
          } else {
            self.showErrorMessage([ERROR_MESSAGE]);
          }
          self.disableButtonPost = false;
          self.showLoading = false;
        });
    },
  },
};
</script>
