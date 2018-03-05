<template>
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
</template>

<style>
    body {
        margin: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>

<script>
    export default {}
</script>
