<template>
<div>
    <b-alert v-model="showAlert" dismissible variant="danger" class="post-form-alert">
        <ul>
            <li v-for="m in this.errorMessage" :key="m">
                {{m}}
            </li>
        </ul>
    </b-alert>
    <div class="mt-4" v-for="post in this.postList" :key="post.post_id">

        <span>{{post.date}}</span>
        <b-dropdown size="md" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
            </template>
            <b-dropdown-item @click="deleteClick(post.post_id)" variant="danger">Delete</b-dropdown-item>
        </b-dropdown>
        <b-card :img-src="post.image_url" img-alt="Card image" img-left class="mb-3 ideas-listing-image">
            <b-card-text>
                {{post.content}}
            </b-card-text>
        </b-card>
    </div>
    <div class="text-center my-5" v-if="showSpinner">
        <b-spinner label="Loading..."></b-spinner>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "IdeasListing",
    props: ['postList', 'showAlert', 'errorMessage', 'showSpinner'],
    methods: {
        deleteClick(postId) {
            console.log(postId);

            const deletePostUrl = process.env.VUE_APP_API_HOST + "/api/post/delete";
            const data = {
                "post_id": postId
            };
            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': localStorage.JWT
                }
            };

            axios.post(deletePostUrl, data, config)
                .then((response) => {
                    if (response.status === 204) {
                        this.$emit('onDeleteSuccess')
                    }
                })
                .catch((error) => {
                    this.$emit('onDeleteError', error)
                })
        }
    }
}
</script>
