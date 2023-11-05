<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  SwitchButton,
  CaretBottom,
  Avatar,
  Connection,
  Money,
  Shop,
  House,
  MapLocation,
  Coin,
  FullScreen,
  Sunny,
  MoonNight,
  Refresh
} from '@element-plus/icons-vue'
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router'
const $router = useRouter()

const handleCommand = (key) => {
  if (key === 'logout') {
    alert('您确定要退出吗？')
    localStorage.removeItem('user_token')
    $router.push('/login')
  }
}
// 用户头像
const username = localStorage.getItem('name')
// 暗黑模式切换
const dark = ref(false)
// 头像
const state = reactive({ circleUrl: 'https://gd-hbimg.huaban.com/e94fed16e2388a8fd9792a40249bd59fad32060c17323a-P5zkZG_fw658', })
const { circleUrl } = toRefs(state)
// 全屏回调
const fullScreen = () => {
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 暗黑模式日间模式切换
const changeDrak = () => {
  const html = document.documentElement
  console.log(html);
  dark.value ? html.className = 'dark' : html.className = ''
}
// 刷新按钮
const reLoad = () => {
  window.location.reload()
}
</script>

<template>
    <div>
      <el-container class="layout-container">
        <el-aside width="300px">
          <div class="el-aside__logo"></div>
          <el-menu active-text-color="#ffd04b" background-color="#404455" :default-active="$route.path" text-color="#fff"
            router>
            <el-menu-item index="/index/index">
              <el-icon>
                <House />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/order/escortOrder">
              <el-icon>
                <Management />
              </el-icon>
              <span>陪诊订单管理</span>
            </el-menu-item>
            <el-menu-item index="/order/doctorOrder">
              <el-icon>
                <Promotion />
              </el-icon>
              <span>医生预约订单管理</span>
            </el-menu-item>
            <el-menu-item index="/order/refundOrder">
              <el-icon>
                <Money />
              </el-icon>
              <span>退款订单管理</span>
            </el-menu-item>
            <el-sub-menu index="/order">
              <template #title>
                <el-icon>
                  <Connection />
                </el-icon>
                <span>寄药买药订单管理</span>
              </template>
              <el-menu-item index="/order/sendOrder">
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>寄药订单管理</span>
              </el-menu-item>
              <el-menu-item index="/order/buyOrder">
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>买药订单管理</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/user">
              <template #title>
                <el-icon>
                  <Connection />
                </el-icon>
                <span>用户管理</span>
              </template>
              <el-sub-menu index="/user/allUser">
                <template #title>
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>客户端用户管理</span>
                </template>
                <el-menu-item index="/user/allUser/doctorUser">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>医生管理</span>
                </el-menu-item>
                <el-menu-item index="/user/allUser/compUser">
                  <el-icon>
                    <Avatar />
                  </el-icon>
                  <span>陪诊师管理</span>
                </el-menu-item>
                <el-menu-item index="/user/allUser/silkUser">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>患者管理</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item index="/user/staffUser">
                <el-icon>
                  <Crop />
                </el-icon>
                <span>后台用户管理</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/medicine">
              <el-icon>
                <Coin />
              </el-icon>
              <span>药品管理</span>
            </el-menu-item>
            <el-menu-item index="/hospital">
              <el-icon>
                <Shop />
              </el-icon>
              <span>医院管理</span>
            </el-menu-item>
            <el-menu-item index="/map">
              <el-icon>
                <MapLocation />
              </el-icon>
              <span>地图</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <div class="box">
              <div class="left">
                <div>后台操作员:&nbsp;&nbsp;<strong>{{ username }}</strong></div>
              </div>
              <div class="right">
                <el-button :icon="Refresh" circle @click="reLoad"></el-button>
                <!-- 暗黑模式切换 -->
                <el-switch @change="changeDrak" v-model="dark" size="large" class="mt-2" inline-prompt
                  :active-icon="MoonNight" :inactive-icon="Sunny"
                  style="--el-switch-on-color: #383838; --el-switch-off-color: #03a9f3" />
                <!-- 全屏按钮 -->
                <el-button @click="fullScreen" class="btn_screen" :icon="FullScreen" circle />
                <!-- 头像 -->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                  <span class="el-dropdown__box">
                    <el-avatar :size="55" :src="circleUrl" />
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>安心医疗 ©2023 Created by &nbsp; Curen,Kirito,Shabi.</el-footer>
        </el-container>
      </el-container>
    </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  margin: -8px;

  .el-aside {
    background-color: #404455;

    &__logo {
      height: 120px;
      background: url('@/assets/logo1.png') no-repeat center / 230px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    background-color: #e6e3e3;
  }
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right {
    width: 250px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
