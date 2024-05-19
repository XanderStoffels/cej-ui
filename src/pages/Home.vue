<template>
    <div class="flex flex-col items-center justify-center gap-2 p-4">
        <div class="border">
            <canvas ref="canvas" width="300" height="300"></canvas>
        </div>
        <button class="w-[300px] rounded h-10 bg-gray-100" @click="kanjiCanvas?.clear()">Clear</button>
    </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { KanjiCanvas, useKanjiCanvas } from '../composables/kanji-canvas';

const { makeKanjiCanvas } = useKanjiCanvas();

const canvas = ref<HTMLCanvasElement | null>(null);

let kanjiCanvas: KanjiCanvas | null = null;

onMounted(async () => {
    if (canvas.value) {
        kanjiCanvas = makeKanjiCanvas(canvas.value, true);
    }
});



</script>

<style scoped></style>