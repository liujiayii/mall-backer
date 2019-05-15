<template>
  <div class="menu">
    <div
      class="logo"
      :style="{marginLeft:collapsed?'26px':'16px'}"
    />
    <a-menu
      mode="inline"
      :default-selected-keys="[$route.path]"
      :style="{ borderRight: 0 }"
      :open-keys="openKeys"
      @openChange="onOpenChange"
      @click="menuClick"
    >
      <template v-for="(item) in Menu">
        <a-sub-menu
          v-if="item.path!=='/'"
          :key="item.path"
        >
          <span slot="title">
            <a-icon :type="item.Ico" />
            <span>{{ $t(`routerName.${item.name}`) }}</span>
          </span>
          <a-menu-item
            v-for="(item_c) in item.children"
            :key="item_c.path"
          >
            {{ $t(`routerName.${item_c.name}`)
            }}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="item.children[0].path"
        >
          <a-icon :type="item.Ico" />
          <span>{{ $t(`routerName.${item.children[0].name}`) }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: "Slide",
    props: ['collapsed'],
    data() {
      return {
        openKeys: [],
        Menu: this.$store.state.menu,
      }
    },
    mounted() {
      this.openKeys.push("/" + this.$route.path.split("/")[1]);
    },
    methods: {
      menuClick(item) {
        this.$router.push({path: item.key});
      },
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(
          key => this.openKeys.indexOf(key) === -1
        );
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      },
    }
  }
</script>

<style lang="less" scoped>
  .menu {
    overflow: scroll;
    height: 100vh;
    background: #24365e;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

    &::-webkit-scrollbar {
      display: none;
    }

    .ant-menu-root {
      background: #24365e;
      color: #fff;
    }

    .logo {
      height: 32px;
      background: url("../../../assets/images/logo.png") no-repeat;
      background-size: cover;
      margin: 16px;
      transition: all 0.5s;
    }
  }
</style>
