<template>
<div id="app" :style="{'padding-top':navbarHeight+'px'}">

    <Navbar ref="navbarComponent" @navbarHeight="receiveNavHeight" v-if="true"></Navbar>
    <IdeasListingPage :navbar-height="navbarHeight" v-if="loadIdeasListingPage"></IdeasListingPage>
</div>
</template>

<script>
//components
import Navbar from './components/Navbar.vue'

//pages
import IdeasListingPage from './pages/IdeasListingPage.vue'
import LoginPage from './pages/LoginPage.vue'

export default {
    name: 'App',
    components: {
        Navbar,
        IdeasListingPage
    },
    data: function () {
        return {
            navbarHeight: 0,
            loadIdeasListingPage: false,
            currentRoute: window.location.pathname
        }
    },
    methods: {
        receiveNavHeight: function (val) {
            this.navbarHeight = val
            this.loadIdeasListingPage = true
        }
    }
}
</script>

<style>
</style>
