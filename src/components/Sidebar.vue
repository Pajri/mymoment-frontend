<template>
<div>
    <b-button v-b-toggle.shr-sidebar squared class="toggle-sidebar">
        <b-icon icon="plus-square"></b-icon>
    </b-button>
    <b-sidebar id="shr-sidebar" ref="shrSidebar" title="Sidebar" bg-variant="primary" text-variant="light" shadow v-bind:class="{'shr-sidebar': isOpen}" :visible="true">
        <div class="px-3 py-2">
            <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
        </div>
    </b-sidebar>
</div>
</template>

<script>
import {
    BButton,
    BSidebar,
    BIcon
} from 'bootstrap-vue'

export default {
    props: ["navbar-height"],
    data: function () {
        return {
            sidebarBackground: "bg-dark text-white",
            isOpen: true,
            windowHeight: window.innerHeight
        }
    },
    components: {
        BButton,
        BSidebar,
        BIcon
    },
    mounted: function () {
        this.setSidebarHeight()
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize)
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        setSidebarHeight: function () {
            var height = this.windowHeight - this.navbarHeight
            this.$refs.shrSidebar.$el.querySelector("#shr-sidebar").style.height = height + 'px'
        },
        onResize: function () {
            this.windowHeight = window.innerHeight
            this.setSidebarHeight()
        }
    }
}
</script>
