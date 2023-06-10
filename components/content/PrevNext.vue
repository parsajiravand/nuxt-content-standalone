<!-- ./components/PrevNext.vue -->

<script setup>

// define prev and next props
defineProps(["prev", "next"]);
</script>

<template>
  <ul class="prev-next-cont">
    <li class="link-item prev">
      <NuxtLink v-if="prev" :to="prev._path" class="hover:text-blue-500 "  >
        
        <Icon name="mdi:chevron-left" class="w-5 h-5 mt-1" />
        <span> {{ prev.title }} </span>
      </NuxtLink>
    </li>
    <li class="link-item next">
      <NuxtLink v-if="next" :to="next._path" class="hover:text-blue-500 " >
        <span> {{ next.title }} </span>
        <Icon name="mdi:chevron-right" class="w-5 h-5 mt-1" />
       
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg;
}

.link-item a {
  @apply flex gap-2;
}
</style>
