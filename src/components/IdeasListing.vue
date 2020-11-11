<template>
<div>
    <b-alert v-model="showAlert" dismissible variant="danger" class="mt-2">{{errorMessage}}</b-alert>

    <div class="text-center mt-5" v-if="showSpinner">
        <b-spinner label="Loading..."></b-spinner>
    </div>

    <div class="mt-4" v-for="post in this.postList" :key="post.post_id">
        <span>{{post.date}} {{post.hidden_date}}</span>
        <b-card :img-src="post.image_url" img-alt="Card image" img-left class="mb-3 ideas-listing-image">
            <b-card-text>
                {{post.content}}
            </b-card-text>
        </b-card>
    </div>
</div>
</template>

<script>
export default {
    name: "IdeasListing",
    props: ['postList', 'showAlert', 'errorMessage', 'showSpinner'],
}
</script>
