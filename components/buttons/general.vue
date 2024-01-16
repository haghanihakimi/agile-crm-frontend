<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'button', 
    },
    fontStrength: {
        type: String,
        default: 'font-medium',
    },
    px: {
        type: String,
        default: 'px-4',
    },
    py: {
        type: String,
        default: 'py-8',
    },
    background: {
        type: String,
        default: 'bg-transparent',
    },
    tracking: {
        type: String,
        default: 'tracking-wide',
    },
    textSize: {
        type: String,
        default: 'text-base',
    },
    textColor: {
        type: String,
        default: 'text-white',
    },
    width: {
        type: String,
        default: 'w-full'
    },
    height: {
        type: String,
        default: 'h-full' 
    },
    radius: {
        type: String,
        default: 'rounded'
    },
    display: {
        type: String,
        default: 'flex flex-row justify-center items-center gap-1'
    }
});

const classes = computed(() => {
    let result = [];
    for (const [key, value] of Object.entries(props)) {
        result.push(value)
    }
    return result;
})

</script>

<template>
    <button 
    :type="props.type"
    :class="classes" >
        <slot></slot>
    </button>
</template>