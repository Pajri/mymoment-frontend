<template>
<div :style="{'padding-top':navbarHeight+'px'}">
    <Navbar ref="navbarComponent" @navbarHeight="receiveNavHeight" v-if="true"></Navbar>
    <router-view />
</div>
</template>

<script>
//components
import Navbar from '../../components/Navbar.vue'

export default {
    name: 'InnerPageContainer',
    components: {
        Navbar
    },
    data: function () {
        return {
            navbarHeight: 0,
            loadIdeasListingPage: false
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
