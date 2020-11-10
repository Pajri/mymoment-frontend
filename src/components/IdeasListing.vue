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
export default {
    name: "IdeasListing",
    props: ['postList']
}
</script>
