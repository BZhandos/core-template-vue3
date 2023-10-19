<script setup lang="ts">
/**
 * Базовый Лэйаут для все основных страниц SPA.
 * Все общие запросы должны делаться отсюда.
 *
 * Пример с {@link useIdle https://vueuse.org/core/useIdle/} слежка за неактивностью
 * (закончить сессию,показать всплывашку-напоминалку, обновить токен)
 * */


import { watch } from "vue";
import { useIdle } from "@vueuse/core";


const ONE_MINUTE = 60_000

const { idle } = useIdle(30 * ONE_MINUTE);

watch(idle, (idleValue) => {
    if (idleValue) {
        // здесь делать экшены
    }
})

</script>

<template>
    <div class="main-container">
        <RouterView />
    </div>
</template>

<style scoped>
.main-container {
    min-height: 100vh;
    margin: 150px auto 0 auto;
    width: 100%;
}
</style>
