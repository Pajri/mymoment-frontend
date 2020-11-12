<template>
<div>
    <b-container class="ideas-listing-container">
        <b-row>
            <b-col md="12">
                <Sidebar :navbar-height="navbarHeight" v-if="false" />
                <PostForm @onPosted="insertPost" />
                <IdeasListing :postList="postList" :errorMessage="listingErrorMessage" :showAlert="isListingAlertShow" :showSpinner="isListingSpinnerShow" />
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import axios from "axios";
import {
    getAccessToken
} from "@/module/auth_util"
import Sidebar from "../../components/Sidebar.vue";
import IdeasListing from "../../components/IdeasListing.vue";
import PostForm from "../../components/PostForm.vue";
import {
    BCol,
    BContainer,
    BRow
} from "bootstrap-vue";

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
            listingErrorMessage: "",
            isListingAlertShow: false,
            isListingSpinnerShow: false,
        }
    },
    mounted() {
        window.onscroll = this.handleScroll
    },
    created() {
        this.loadPostList(10, null)
    },
    methods: {
        loadPostList(limit, date) {
            this.isListingSpinnerShow = true;
            this.hideListingErrorAlert();

            let getListUrl = process.env.VUE_APP_API_HOST + "/api/post";

            let param = []
            param.push("limit=" + limit)
            if (date != null) {
                param.push("date=" + encodeURIComponent(date))
            }
            getListUrl = getListUrl + "?" + param.join("&");

            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': getAccessToken()
                }
            };

            axios.get(getListUrl + "", config)
                .then((response) => {
                    if (response.data.post_list != null && response.data.post_list.length > 0) {
                        this.postList = this.postList.concat(response.data.post_list);
                        console.log("length : " + this.postList.length)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.showListingErrorAlert(error.response.data.message)
                })
                .finally(() => this.isListingSpinnerShow = false)
        },
        insertPost(post) {
            this.postList.unshift(post);
        },
        hideListingErrorAlert() {
            this.listingErrorMessage = "";
            this.isListingAlertShow = false;
        },
        showListingErrorAlert(message) {
            this.listingErrorMessage = message;
            this.isListingAlertShow = true;
        },
        handleScroll() {
            const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight

            const scrolledToBottom = scrollTop >= ((scrollHeight - clientHeight) - 100);
            if (scrolledToBottom && !this.isListingSpinnerShow) {
                const lastPostDate = this.postList[this.postList.length - 1].hidden_date;
                this.loadPostList(5, lastPostDate)
            }
        }
    },

};
</script>
