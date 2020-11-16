<template>
<b-alert variant="danger" dismissible show class="rounded-0">
    <p v-for="m in this.errorMessage" :key="m">
        {{m}}
    </p>
</b-alert>
</template>

<script>
export default {
    name: "ErrorMessage",
    props: ['errorMessage']
}
</script>
