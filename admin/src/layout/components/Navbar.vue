<template>
  <div class="navbar">
    <el-dialog
      v-loading="loading"
      class="station-dialog"
      width="25%"
      :destroy-on-close="true"
      append-to-body
      title="修改密码"
      :visible.sync="modifyVisible"
      @close="closeStationDialog"
    >
      <el-form
        ref="passwordForm"
        style="margin-right:30px;"
        :model="passwordForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="当前密码"
          prop="currPassword"
        >
          <el-input
            v-model.trim="passwordForm.currPassword"
            type="password"
            size="small"
            auto-complete="off"
            class="form-input"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="新的密码"
          prop="newPassword"
        >
          <el-input
            v-model.trim="passwordForm.newPassword"
            type="password"
            size="small"
            auto-complete="off"
            class="form-input"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="confirmNewPassword"
        >
          <el-input
            v-model.trim="passwordForm.confirmNewPassword"
            type="password"
            size="small"
            auto-complete="off"
            class="form-input"
            show-password
          />
        </el-form-item>
        <span
          slot="footer"
          class="dialog-footer"
        />
      </el-form>
      <div class="form-btns">
        <el-button
          type="primary"
          class="left-btn"
          size="small"
          @click="modifyVisible = !modifyVisible"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="modifyPassword"
        >修改</el-button>
      </div>
    </el-dialog>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper currUser">
          <i class="el-icon-s-custom currUser" /><span style="margin-bottom:10px;">&nbsp;{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <router-link to="/">
            <el-dropdown-item>
              <span style="padding-left:10px;">主 页</span>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item
            divided
            @click.native="showModifyPassword"
          >
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userApi } from '@/api/user'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      loading: false,
      modifyVisible: false,
      /* dialog 内容 */
      passwordForm: {
        currPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      rules: {
        currPassword: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度范围为6~16位',
          trigger: 'blur'
        }],
        newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度范围为6~16位',
          trigger: 'blur'
        }],
        confirmNewPassword: [{
          required: true,
          message: '请输入新密码再次确认',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度范围为6~16位',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  mounted() {

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('self/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`) // 用这个左侧菜单有缓存
      window.location.href = '/'
    },
    closeStationDialog() {
      this.passwordForm.currPassword = ''
      this.passwordForm.newPassword = ''
      this.passwordForm.confirmNewPassword = ''
    },
    showModifyPassword() {
      this.modifyVisible = true
    },
    modifyPassword() {
      if (this.passwordForm.currPassword !== '' &&
        this.passwordForm.newPassword !== '' &&
        this.passwordForm.confirmNewPassword !== '') {
        // console.log('this.passwordForm:', this.passwordForm)
        if (this.passwordForm.newPassword !== this.passwordForm.confirmNewPassword) {
          this.$message.error('两次输入的新密码不一致')
        } else {
          this.loading = true
          userApi
            .modifyMyPassword(this.passwordForm.currPassword, this.passwordForm.newPassword)
            .then(res => {
              if (res === true) {
                this.loading = false
                this.closeStationDialog()
                this.modifyVisible = false
                this.$message.success('修改密码成功')
              } else {
                this.loading = false
                this.$message.error(res)
              }
            })
            .catch(e => {
              this.$message.error(e)
            })
            .finally(() => {
            })
        }
      } else {
        this.$message.warning('请填写修改信息')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.currUser:hover {
  cursor: pointer;
}
.form-btns {
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-btn {
  margin-right: 15px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    vertical-align: top;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
