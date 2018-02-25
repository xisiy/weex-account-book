<template>
    <div class="app" @androidback="back">
        <router-view></router-view>
    </div>
</template>

<style>
    .app {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        methods: {
            back: function () {
                this.$router.back()
            }
        }
    }
</script>