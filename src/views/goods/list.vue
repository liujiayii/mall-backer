<template>
  <div>
    <p>{{ $t('header.HeadMenu.center') }}</p>
    <a-pagination
      :default-current="1"
      :total="50"
      show-size-changer
    />
  </div>
</template>

<script>
  export default {
    name: "List"
  }
</script>

<style scoped>

</style>
