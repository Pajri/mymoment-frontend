<template>
<div>
    <b-container class="ideas-listing-container">
        <b-row>
            <b-col md="12">
                <Sidebar :navbar-height="navbarHeight" v-if="false" />
                <PostForm />
                <IdeasListing />
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
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
};
</script>
