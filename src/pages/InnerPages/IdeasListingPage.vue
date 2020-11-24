<template>
  <b-container class="ideas-listing-container">
    <b-row>
      <b-col md="12" class="background-independence">
        <Sidebar :navbar-height="navbarHeight" v-if="false" />
        <PostForm @onPosted="insertPost" />
        <IdeasListing
          :postList="postList"
          :errorMessage="listingErrorMessage"
          :showAlert="isListingAlertShow"
          :showSpinner="isListingSpinnerShow"
          @onDeleteSuccess="onDeleteSuccess"
          @onDeleteError="onDeleteError"
          @onDismissed="hideListingErrorAlert"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { getAccessToken } from "@/module/auth_util";
import { generateErrorMessageFromResponse } from "@/module/axios_util"

import Sidebar from "../../components/Sidebar.vue";
import IdeasListing from "../../components/IdeasListing.vue";
import PostForm from "../../components/PostForm.vue";
import { BCol, BContainer, BRow } from "bootstrap-vue";

export default {
  props: ["navbar-height"],
  components: {
    Sidebar,
    IdeasListing,
    PostForm,

    BCol,
    BContainer,
    BRow,
  },
  data() {
    return {
      postList: [],
      listingErrorMessage: [],
      isListingAlertShow: false,
      isListingSpinnerShow: false,
    };
  },
  mounted() {
    window.onscroll = this.handleScroll;
  },
  created() {
    this.loadPostList(10, null);
  },
  methods: {
    loadPostList(limit, date) {
      this.isListingSpinnerShow = true;
      this.hideListingErrorAlert();

      let getListUrl = process.env.VUE_APP_API_HOST + "/api/post";

      let param = [];
      param.push("limit=" + limit);
      if (date != null) {
        param.push("date=" + encodeURIComponent(date));
      }
      getListUrl = getListUrl + "?" + param.join("&");

      const config = {
        withCredentials: true,
        headers: {
          Authorization: getAccessToken(),
        },
      };

      axios
        .get(getListUrl + "", config)
        .then((response) => {
          if (
            response.data.post_list != null &&
            response.data.post_list.length > 0
          ) {
            this.postList = this.postList.concat(response.data.post_list);
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            this.showListingErrorAlert([error.response.data.message]);
          } else {
            const message = generateErrorMessageFromResponse(error);
            this.showListingErrorAlert([message]);
          }
        })
        .finally(() => (this.isListingSpinnerShow = false));
    },
    insertPost(post) {
      this.postList.unshift(post);
    },
    hideListingErrorAlert() {
      this.listingErrorMessage = [];
      this.isListingAlertShow = false;
    },
    showListingErrorAlert(message) {
      this.listingErrorMessage = message;
      this.isListingAlertShow = true;
    },
    handleScroll() {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const scrolledToBottom = scrollTop >= scrollHeight - clientHeight - 100;
      if (scrolledToBottom && !this.isListingSpinnerShow && this.postList.length > 10) {
        const lastPostDate = this.postList[this.postList.length - 1]
          .hidden_date;
        this.loadPostList(5, lastPostDate);
      }
    },
    onDeleteSuccess() {
      this.postList = [];
      this.loadPostList(10, null);
    },
    onDeleteError(error) {
      this.hideListingErrorAlert();
      if (error.response.data.message) {
        this.showListingErrorAlert(error.response.data.message);
      } else {
        const message = generateErrorMessageFromResponse(error);
        this.showListingErrorAlert([message]);
      }
    },
  },
};
</script>
