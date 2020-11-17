<template>
<b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" ref="navbar" class="background-dark border-0">
    <b-navbar-brand href="/" class="nav-brand">My Moment</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-nav-form class="nav-searchbar-container col-md-5" v-if="false">
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
            <b-nav-text class="text-white">Hi, {{fullName}}

            </b-nav-text>
            <b-nav-item-dropdown right class="rounded-0-dropdown custom-dropdown" no-caret>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <font-awesome-icon icon="bars" />
                </template>
                <b-dropdown-item @click="dropdownClick($event,'profile')">Profile</b-dropdown-item>
                <b-dropdown-item @click="dropdownClick($event,'sign_out')" class="sign-out">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
</b-navbar>
</template>

<script>
import axios from 'axios'

import {
    getAccessToken,
    removeAccessToken
} from "@/module/auth_util"

import {
    BIcon
} from 'bootstrap-vue'

import {
    getFullName
} from "@/module/auth_util"

export default {
    components: {
        BIcon
    },
    data() {
        return {
            fullName: "",
        }
    },
    created() {
        this.fullName = getFullName();
    },
    mounted() {
        this.$emit('navbarHeight', this.$refs.navbar.$el.clientHeight)
    },
    methods: {
        dropdownClick(evt, clickedDropdown) {
            evt.preventDefault();

            switch (clickedDropdown) {
                case "sign_out":
                    this.handleSignOut();
                    break;
                case "profile":
                    this.$router.push("/profile");
                    break;
                default:
                    console.log("default value reached");
                    break;
            }

        },
        handleSignOut() {
            const signOutUrl = process.env.VUE_APP_API_HOST + "/api/auth/signout";
            const config = {
                withCredentials: true,
                headers: {
                    'Authorization': getAccessToken()
                }
            };

            axios.post(signOutUrl, null, config)
                .then((response) => {
                    if (response.status === 200) {
                        removeAccessToken()
                        this.$router.push("/login")
                    }
                })
                .catch((error) => console.log(error))
        }
    }
}
</script>
