<template>
<b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" ref="navbar">
    <b-navbar-brand href="#" class="nav-brand">Share Ideas</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-nav-form class="nav-searchbar-container col-md-5">
        <b-input-group size="sm" class="col-md-12">
            <b-form-input placeholder="Search ..."></b-form-input>

            <b-input-group-append is-text>
                <b-icon icon="search"></b-icon>
            </b-input-group-append>
        </b-input-group>
    </b-nav-form>

    <b-collapse id="nav-collapse" is-nav class="nav-right-menu">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right class="rounded-0-dropdown">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    User
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
</b-navbar>
</template>

<script>
import {
    BIcon
} from 'bootstrap-vue'

export default {
    components: {
        BIcon
    },
    mounted() {
        this.$emit('navbarHeight', this.$refs.navbar.$el.clientHeight)
    },
}
</script>
