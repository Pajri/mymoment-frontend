<template>
  <div>
    <div class="my-4">&nbsp;</div>
    <error-message
      :errorMessage="this.errorMessage"
      v-if="showAlert"
      class="post-form-alert"
    ></error-message>
    <div
      class="my-2 background-dark post-element"
      v-for="post in this.postList"
      :key="post.post_id"
    >
      <div class="py-1 d-flex border-bottom post-top">
        <span class="text-white ml-2 align-self-center date">{{
          post.date
        }}</span>
        <b-dropdown
          size="md"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          class="ml-auto align-self-center custom-dropdown custom-dropdown-post rounded-0"
          right
        >
          <template #button-content>
            <b-icon
              icon="three-dots-vertical"
              class="custom-dropdown-button"
            ></b-icon>
          </template>
          <b-dropdown-item @click="deleteClick(post.post_id)"
            >Delete</b-dropdown-item
          >
        </b-dropdown>
      </div>

      <b-card no-body class="mb-3 ideas-listing-image rounded-0 border-0 background-dark text-white">
        <b-row no-gutters>
          <b-col lg="3" v-if="post.image_url" @click="imageClick(post.image_url)">
            <b-card-img-lazy
              :src="post.image_url"
              alt="Card image"
              class="rounded-0"
            ></b-card-img-lazy>
          </b-col>

          <b-col lg="9" class="p-2" v-if="post.image_url">
            <b-card-text class="rounded-0">
              {{ post.content }}
            </b-card-text>
          </b-col>

          <b-col lg="12" class="p-2" v-if="!post.image_url">
            <b-card-text class="rounded-0">
              {{ post.content }}
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="text-center text-white my-5 py-3 post-loading" v-if="showSpinner">
      <b-spinner label="Loading..." small></b-spinner>
    </div>
    <b-modal id="modal_image" hide-footer size="xl" modal-class="post-image-modal">
      <b-img :src="modalImage" fluid alt="Modal Image"></b-img>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage.vue";

export default {
  name: "IdeasListing",
  props: ["postList", "showSpinner","showAlert","errorMessage"],
  components: {
    ErrorMessage,
  },
  data(){
    return {
      modalImage : "",
    }
  },
  methods: {
    deleteClick(postId) {
      const deletePostUrl = process.env.VUE_APP_API_HOST + "/api/post/delete";
      const data = {
        post_id: postId,
      };
      const config = {
        withCredentials: true,
        headers: {
          Authorization: localStorage.JWT,
        },
      };

      axios
        .post(deletePostUrl, data, config)
        .then((response) => {
          if (response.status === 204) {
            this.$emit("onDeleteSuccess");
          }
        })
        .catch((error) => {
          this.$emit("onDeleteError", error);
        });
    },
    imageClick(imageUrl){
      this.modalImage = imageUrl;
      this.$bvModal.show("modal_image");
    }
  },
};
</script>
