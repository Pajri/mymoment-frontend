<template>
<div>
    <b-container class="ideas-listing-container">
        <b-row>
            <b-col md="12">
                <Sidebar :navbar-height="navbarHeight" v-if="false"></Sidebar>
                <IdeasListing></IdeasListing>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue"
import IdeasListing from "../components/IdeasListing.vue"
import {
    BContainer,
    BRow,
    BCol
} from "bootstrap-vue"
export default {
    props: ["navbar-height"],
    components: {
        Sidebar,
        BContainer,
        BRow,
        IdeasListing,
        BCol

    }
}
</script>
