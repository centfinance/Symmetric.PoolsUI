<template>
  <UiModal :open="open" @close="$emit('close')" style="max-width: 600px">
    <div class="modal-header">
      <div class="modal-title">{{ $t('caution') }}!</div>
    </div>
    <div class="modal-body px-6 pb-6 text-white">
      <div class="mt-2">{{ $t('investWarning') }}</div>
      <div class="mt-4 d-flex flex-items-center flex-justify-center">
        <UiButton class="button-primary" @click="$emit('close')">
          {{ $t('continue') }}
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>

<script>
export default {
  props: ['open'],
  data() {
    return {};
  }
};
</script>
