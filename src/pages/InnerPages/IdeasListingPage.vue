<template>
<div>
    <b-container class="ideas-listing-container">
        <b-row>
            <b-col md="12">
                <Sidebar :navbar-height="navbarHeight" v-if="false" />
                <PostForm @onPosted="loadPostList" />
                <IdeasListing :postList="postList" />
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import axios from "axios";
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
        }
    },
    created() {
        this.loadPostList()
    },
    methods: {
        loadPostList() {
            const postListUrl = process.env.VUE_APP_API_HOST + "/api/post";
            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': localStorage.JWT
                }
            };

            axios.get(postListUrl, config)
                .then((response) => {
                    console.log(response.data)
                    this.postList = response.data.post_list;
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
};
</script>
