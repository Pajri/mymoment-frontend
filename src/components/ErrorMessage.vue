<template>
<b-alert variant="danger" dismissible  v-model="isAlertShow" class="rounded-0" @dismissed="onDismissed">
    <p v-for="m in this.errorMessage" :key="m">
        {{m}}
    </p>
</b-alert>
</template>

<script>
export default {
    name: "ErrorMessage",
    props: ['errorMessage','showAlert'],
    created(){
        this.isAlertShow = this.showAlert;
    },
    data(){
        return {
            isAlertShow : Boolean,
        }
    },
    watch: {
        showAlert(){
            this.isAlertShow = this.$props.showAlert;
        }
    },
    methods:{
        onDismissed : function(){
            this.$emit('onDismissed')
        }
    }
    
}
</script>
