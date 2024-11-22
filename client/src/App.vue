<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
// Optional: Add any global-level logic
</script>