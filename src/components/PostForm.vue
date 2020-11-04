<template>
<div class="post-editor-container bg-secondary">
    <b-form-textarea id="textarea-rows" placeholder="How was your day ?" rows="1" @keyup="countCharacter"></b-form-textarea>
    <div class="d-flex flex-row justify-content-end post-meta-container">
        <b-button variant="success" class="mr-auto align-self-center">
            <b-icon icon="card-image"></b-icon>
        </b-button>

        <span class="align-self-center">{{charCount}}</span>
        <b-button variant="success" class="">Post !</b-button>
    </div>
</div>
</template>

<script>
import {
    BIcon
} from "bootstrap-vue";

export default {
    components: {
        BIcon
    },
    data() {
        return {
            charCount: 25
        }
    },
    methods: {
        countCharacter() {
            this.charCount++
        }
    },

}
</script>
