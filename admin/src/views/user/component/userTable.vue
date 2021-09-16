<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      height="582"
      :max-height="maxHeight"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showOperation"
        key="1"
        width="60px"
        align="center"
        fixed="left"
        label="选择"
      >
        <el-table-column
          type="selection"
          align="center"
          width="60px"
        />
      </el-table-column>
      <el-table-column
        v-if="showRadio"
        key="2"
        width="60px"
        align="center"
        fixed="left"
        label="选择"
      >

        <el-table-column
          align="center"
          width="60px"
        >
          <template slot-scope="scope">
            <input
              type="radio"
              name="radio"
              @click="radioClick(scope.row)"
            >
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        key="3"
        align="center"
        label="序号"
      >
        <el-table-column
          type="index"
          width="60px"
          prop="idx"
          align="center"
        />
      </el-table-column>

      <el-table-column
        key="4"
        label="账号"
        align="center"
        :span="4"
      >
        <el-table-column
          prop="username"
          :span="4"
        >
          <template
            slot="header"
            slot-scope="{}"
          >
            <el-input
              v-model.trim="user.username"
              clearable
              size="mini"
              placeholder="搜索账号"
              @change="search"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        key="5"
        label="用户名"
        header-align="center"
        :span="4"
      >
        <el-table-column
          prop="usernameCn"
          :span="4"
        >
          <template
            slot="header"
            slot-scope="{}"
          >
            <el-input
              v-model.trim="user.usernameCn"
              clearable
              size="mini"
              placeholder="搜索用户名"
              @change="search"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        key="6"
        label="角色"
        header-align="center"
        :span="4"
      >
        <el-table-column
          prop="partNo"
          :span="4"
        >
          <template
            slot="header"
            slot-scope="{}"
          >
            <el-input
              v-model.trim="user.partNo"
              clearable
              size="mini"
              placeholder="搜索角色"
              @change="search"
            />
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        key="9"
        label="状态"
        header-align="center"
        :span="4"
      >
        <el-table-column
          prop="status"
          :span="4"
        >
          <template
            slot="header"
            slot-scope="{}"
          >
            <el-input
              v-model.trim="user.status"
              disabled
              clearable
              size="mini"
              placeholder="状态"
              @change="search"
            />
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.status==0?'正常':'已作废' }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        key="8"
        label="创建时间"
        header-align="center"
        :span="4"
      >
        <el-table-column
          prop="createTime"
          :span="4"
        >
          <template
            slot="header"
            slot-scope="{}"
          >
            <el-date-picker
              v-model.trim="user.createTime"
              style="width:180px"
              clearable
              size="mini"
              placeholder="选择日期"
              type="date"
              value-format="yyyy-MM-dd"
              @change="search"
            />
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        v-if="showOperation"
        key="11"
        fixed="right"
        align="center"
        :span="4"
        label="操作"
      >
        <el-table-column
          fixed="right"
          align="center"
          :span="4"
        >
          <template slot-scope="scope">
            <el-button
              class="action-btn"
              size="mini"
              type="text"
              @click="changePassword(scope.row.username)"
            >
              重置密码
            </el-button>
            &nbsp;|
            <el-button
              v-popover:rolePop
              class="action-btn"
              type="text"
              size="mini"
              @click="deprecateUser(scope.row)"
            >
              {{ scope.row.status? '激活' : '作废' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="pageData.currPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="pageData.totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--右侧操作栏-->
    <el-dialog
      width="200"
      title="修改密码"
      :visible.sync="changePwdVisible"
      :destroy-on-close="true"
    >
      <div class="all-center">
        <div style="width:70%">
          <el-form
            ref="pwdForm"
            label-position="right"
            :model="pwdForm"
            :rules="pwdRule"
            label-width="80px"
          >
            <el-form-item
              label="用户账号"
              prop="account"
            >
              <el-input
                v-model.trim="currUser.account"
                size="small"
                disabled
                maxlength="20"
                auto-complete="off"
                class="form-input"
              />
            </el-form-item>
            <el-form-item
              label="新密码"
              prop="password"
            >
              <el-input
                v-model.trim="pwdForm.password"
                size="small"
                placeholder="新密码"
                maxlength="20"
                auto-complete="off"
                class="form-input"
                show-password
              />
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="confirm"
            >
              <el-input
                v-model.trim="pwdForm.confirm"
                class="form-input"
                size="small"
                placeholder="确认密码"
                maxlength="20"
                auto-complete="off"
                show-password
              />
            </el-form-item>
          </el-form>
          <div style="width: 100%; text-align:center">
            <el-button @click="pwdSubmit">
              确定
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
// import { userApi } from '@/api/user'

export default Vue.extend({
  name: 'UserTable',
  components: {

  },
  props: {
    showOperation: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: Number,
      default: 600
    },
    showRadio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // userlist table
      listLoading: false,
      list: [],
      //  userlist分页
      pageData: {
        totalNum: 0,
        currPage: 1,
        pageSize: 10
      },
      user: {},
      multipleSelection: [],
      currUser: { account: '', name: '' },
      currUserInfo: {},
      // change password
      changePwdVisible: false,
      pwdForm: { password: '', confirm: '' },
      pwdRule: {
        password: [
          {
            required: true,
            message: '请输新密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            // validator: validateConfirm,
            trigger: 'blur'
          }
        ]
      },
      workshopOptions: [
        {
          paramId: '',
          paramType: '',
          paramValue: '全部'
        }
      ],
      userWorkShop: []
    }
  },
  mounted() {

  },
  methods: {
    sendpwdForm() {
      this.$emit('transpwdform', this.pwdForm)
    },
    // userlist table
    getUserList(user, pageData) {
      // this.listLoading = true
    },
    search() {
      this.pageData = {
        totalNum: 0,
        currPage: 1,
        pageSize: 10
      }
      this.getUserList(this.user, this.pageData)
    },
    // selection box
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 修改密码
    changePassword(username) {
      this.currUser.account = username
      this.changePwdVisible = true
    },
    pwdSubmit() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          console.log('form valid')
        } else {
          return false
        }
      })
    },
    // 废除用户
    deprecateUser(row) {
      const msg = row.status
        ? '是否将用户重新激活？'
        : '是否将用户状态设置为作废'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.loading = true
        })
        .catch(() => { })
    },
    // 单选选择人员
    radioClick(row) {
      this.$emit('fatherGetUser', row)
    },
    // 分页------------------------------
    handleSizeChange(val) {
      this.initUsePager()
      this.pageData.pageSize = val
      this.getUserList(this.user, this.pageData)
    },
    handleCurrentChange(val) {
      this.pageData.currPage = val
      this.getUserList(this.user, this.pageData)
    },
    initUsePager() {
      this.pageData = {
        total: 0,
        currPage: 1,
        pageSize: 10
      }
    },
    workshopOptionId2Text(row, col, val, index) {
      const option = this.workshopOptions.find((item) => item.paramId === val)
      if (option) {
        return option.paramValue
      }
      return ''
    },
    ChangeIn(row) {
      // const updateWorkshopChange = {
      //   userId: row.userId,
      //   workshop: row.workshop
      // }
    }
  }
})
</script>
<style lang="scss" scoped>
.main {
  text-align: left;
  padding: 10px;
}
.block {
  text-align: center;
  padding: 10px;
}
#barcode-div {
  margin: 0;
}
</style>
