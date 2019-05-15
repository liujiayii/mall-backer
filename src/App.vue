<template>
  <div id="app" class="animated lightSpeedIn">
    <transition name="fade" mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated hinge">
      <router-view />
    </transition>
  </div>
</template>
<style>
  html, body, #app {
    height: 100%;
    width: 100%;
    font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /*抽屉底部*/
  .drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

  .drawer-cont {
    height: calc(100% - 108px);
    overflow: auto;
    padding-bottom: 108px;
  }

  .ant-drawer-body {
    padding-bottom: 60px !important;
  }

  /*数字输入框按钮*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield
  }

  .ant-btn-circle, .ant-btn-circle-outline {
    width: auto !important;
    height: 32px !important;
    padding: 0 15px !important;
    border-radius: 32px !important;
  }

  .ant-menu-submenu > .ant-menu, .ant-menu-submenu-open {
    background: #172a52 !important;
    color: #fff;
  }
  .drawer .ant-drawer-wrapper-body .ant-drawer-body {
    padding: 0;
    overflow: hidden;
  }
  @media(max-width:767px){
    .ant-drawer-body {  padding-bottom: 0px !important;  }
    .ant-menu-submenu-popup{z-index: -1!important;display: none!important;}
    .menu{overflow: hidden!important;}
    .menu .logo{height: 40px!important;}
  }
</style>
