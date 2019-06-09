<template>
  <a-locale-provider :locale="locale">
    <a-layout class="main" has-sider>
      <a-row type="flex" justify="start">
        <a-col :span="24" :xs="0" :sm="0" :md="24">
          <a-layout-sider v-model="collapsed" :breakpoint="'xl'" :trigger="null" collapsible>
            <slide :collapsed="collapsed"/>
          </a-layout-sider>
        </a-col>
      </a-row>
      <a-drawer :visible="visible" placement="left" :closable="false" wrap-class-name="drawer" @close="onClose">
        <slide v-on:changeVisible="(item)=>visible=item"/>
      </a-drawer>
      <a-layout :style="{overflow:'hidden',width:'100%',background:'#f0f0f8'}">
        <a-row type="flex" justify="space-between">
          <a-col :span="24">
            <a-layout-header class="header" :style="{width: '100%'}">
              <a-row type="flex" justify="space-between">
                <a-col :xs="0" :sm="0" :md="4">
                  <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                          @click="()=> collapsed = !collapsed"/>
                </a-col>
                <a-col :xs="4" :sm="4" :md="0">
                  <a-icon class="trigger" type="menu-unfold" @click="()=> visible = !visible"/>
                </a-col>
                <a-col>
                  <div class="user-wrap">
                    <a-icon class="trigger" type="fullscreen" @click="fullScreen"/>
                    <a href="https://github.com/liujiayii/mall-backer" target="_blank">
                      <a-icon class="trigger" type="question-circle"/>
                    </a>
                    <a-dropdown :style="{cursor:'pointer',marginRight:'20px',display:'inline-block'}">
                      <span><a-icon class="trigger" type="global"/></span>
                      <a-menu slot="overlay" @click="lang">
                        <a-menu-item key="zh_CN">
                          简体中文
                        </a-menu-item>
                        <a-menu-item key="en_US">
                          English
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                    <a-dropdown :style="{cursor:'pointer',marginRight:'20px',display:'inline-block'}">
                      <span class="ant-dropdown-link">
                        {{ $t(`header.HeadMenu.${getTimes()}`) }},{{ userName }}
                        <a-icon type="down"/>
                      </span>
                      <a-menu slot="overlay">
                        <a-menu-divider/>
                        <a-menu-item
                          key="3"
                          @click="loginOut"
                        >
                          {{ $t('header.HeadMenu.logout') }}
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                </a-col>
              </a-row>
            </a-layout-header>
          </a-col>
        </a-row>
        <a-breadcrumb :style="{ margin: '80px 20px 20px' }">
          <a-breadcrumb-item>{{ $t(`routerName.home`) }}</a-breadcrumb-item>
          <template v-if="$route.path.split('/').length>2">
            <a-breadcrumb-item>{{ $t(`routerName.${$route.meta.title}`) }}</a-breadcrumb-item>
            <a-breadcrumb-item>{{ $t(`routerName.${$route.name}`) }}</a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <a-layout-content :style="{ padding: '0 20px',overflow: 'scroll'}">
          <div :style="{ minHeight: 'calc(100% - 69px)',padding: '24px', background: '#fff'}">
            <transition
              name="main"
              mode="out-in"
              enter-active-class="animated bounceIn"
              leave-active-class="animated bounceOut"
              :duration="200"
            >
              <router-view/>
            </transition>
          </div>
          <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
          </a-layout-footer>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import en_US from 'ant-design-vue/lib/locale-provider/en_US'
  import slide from './components/slide'
  import screenfull from 'screenfull'

  export default {
    name: "Layout",
    components: {slide},
    data() {
      return {
        collapsed: true,
        userName: window.sessionStorage.getItem("userName"),
        locale: zh_CN,
        visible: false,
        isFullscreen: false
      };
    },
    mounted() {
      this.getTimes();
    },
    methods: {
      onClose() {
        this.visible = false
      },
      lang({key}) {
        let lang = {zh_CN, en_US}
        this.$i18n.locale = key
        this.locale = lang[key]
      },
      loginOut() {
        this.$confirm({
          title: "提示",
          content: "真的要注销登录吗 ?",
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            sessionStorage.clear();
            this.$store.state.menu = [];
            this.$router.push({path: "/login"});
          },
          onCancel: () => {
          }
        });
      },
      getTimes() {
        const time = new Date();
        const hour = time.getHours();
        return hour < 9 ? "a" : hour <= 11 ? "b" : hour <= 13 ? "c" : hour < 20 ? "d" : "e";
      },
      fullScreen() {
        if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
          this.$message.error('不支持全屏')
          return false
        }
        screenfull.toggle()
        this.$message.success('全屏啦')
      }
    }
  };
</script>

<style lang="less" scoped>
  .main {
    position: fixed;
    width: 100%;
    height: 100%;

    .header {
      background: #fff;
      padding: 0;
      z-index: 2;
      position: absolute;
      top: 0;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      transition: all 0.2s;

      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }

      .user-wrap {
        .trigger {
          padding: 0 10px;
        }
      }
    }
  }
</style>
