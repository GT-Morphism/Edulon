<script lang="ts" setup>
  const DATA: globalThis.Ref<{
    id: string;
    slug?: string;
    name: string;
    thumbnail: string;
    created: string;
    updated: string;
  }> = ref({
    id: "",
    name: "",
    thumbnail: "",
    created: "24.07.2024T09:30:15.000Z",
    updated: "24.07.2024T09:30:15.000Z",
  });

  onMounted(() => {
    console.log(useRoute().params.slug);
    DATA.value = {
      ...DATA.value,
      slug: useRoute().params.slug?.toString(),
    };
  });
</script>
