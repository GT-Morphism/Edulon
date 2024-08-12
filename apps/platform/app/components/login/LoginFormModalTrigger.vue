<script setup lang="ts">
  import { LoginFormModal } from "#components";
  const modal = useModal();

  defineShortcuts({
    ctrl_l: {
      usingInput: true,
      handler: () => {
        modal.open(LoginFormModal);
      },
    },
  });
</script>

<template>
  <UTooltip
    text="Jetzt anmelden"
    :shortcuts="['Ctrl', 'L']"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      type="button"
      class="smooth-rotation"
      icon="i-heroicons-arrow-left-on-rectangle"
      variant="ghost"
      color="white"
      :padded="false"
      @click="modal.open(LoginFormModal)"
    >
      <span class="sr-only">Anmelden</span>
    </UButton>
  </UTooltip>
</template>
