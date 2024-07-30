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
    <UButton label="Anmelden" @click="modal.open(LoginFormModal)" />
  </UTooltip>
</template>
