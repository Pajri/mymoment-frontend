<template>
<div>
    <!-- TODO add loading component -->
    <div class="mt-4" v-for="post in this.postList" :key="post.post_id">
        <span>{{post.date}}</span>
        <b-card :img-src="post.image_url" img-alt="Card image" img-left class="mb-3 ideas-listing-image">
            <b-card-text>
                {{post.content}}
            </b-card-text>
        </b-card>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "IdeasListing",
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
}
</script>
