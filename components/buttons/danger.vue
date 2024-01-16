<script setup>
import { withDefaults } from '@nuxt/components';

const { props } = withDefaults(defineProps, {
    fontStrength: String,
    paddingX: String,
    paddingY: String,
    background: String,
    tracking: String,
    textColor: String,
});

const computedClasses = [
    `px-${paddingX || '4'}`,
    `py-${paddingY || '2'}`,
    `font-${fontStrength || 'medium'}`,
    `bg-${background || 'deep-ocean-blue'}`,
    `tracking-${tracking || 'normal'}`,
    `text-${textColor || 'white'}`,
];
</script>

<template>
    <button :class="computedClasses" @click="$emit('click')">
        <slot></slot>
    </button>
</template>