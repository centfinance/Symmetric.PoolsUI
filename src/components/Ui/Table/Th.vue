<template>
  <div class="d-flex flex-items-center px-4 py-3 text-right table-header">
    <slot />
  </div>
</template>

<script>
export default {
  props: ['to']
};
</script>

<style scoped lang="scss">
@import '../../../vars';
.table-header {
  div {
    color: var(--text-primary-color);
  }
}
</style>
