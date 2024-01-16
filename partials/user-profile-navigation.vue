<script setup>

const router = useRouter();

</script>

<template>
    <div class="w-full flex flex-row gap-2 items-center justify-start">
        <ul>
            <!-- <li class="inline-block">
                <NuxtLink to="/profile"
                    class="inline-block text-base font-medium tracking-wide px-4 py-2 text-gray-300 relative group">
                    <p
                        :class="`block w-fit relative ${router.currentRoute.value.name === 'profile' ? 'text-tranquility' : ''}`">
                        Profile
                        <span
                            class="absolute w-full h-[2.3px] rounded-full bg-tranquility bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                    </p>
                </NuxtLink>
            </li> -->
            <li class="inline-block">
                <NuxtLink to="/settings"
                    class="inline-block text-base font-medium tracking-wide px-4 py-2 text-gray-300 relative group">
                    <p
                        :class="`block w-fit relative ${router.currentRoute.value.name === 'settings' ? 'text-tranquility' : ''}`">
                        Settings
                        <span
                            class="absolute w-full h-[2.3px] rounded-full bg-tranquility bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                    </p>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>