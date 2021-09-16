<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        type="primary"
        size="mini"
        @click="addUser"
      >新增</el-button>
      <el-button
        size="mini"
        @click="confirmDelUser"
      >删除</el-button>
    </div>

    <user-table ref="userTableChild" />
  </div>
</template>

<script>
import { userApi } from '@/api/user'
import userTable from './component/userTable'

export default {
  name: 'User',
  components: {
    userTable
  },
  data() {
    return {
      person: {},
      empData: [],
      userSearch: {},
      empLoading: false,
      empPager: {
        total: 0,
        currPage: 1,
        pageSize: 10
      },
      empSelection: [],
      empSearch: {}
    }
  },
  mounted() {
    this.$refs.userTableChild.search()
  },
  methods: {
    getPsersonList(emp, pageData) {
      this.empData = []
      // this.empLoading = true
    },
    loadEmp(empSearch, empPager) {
      this.empData = []
      // this.empLoading = true
    },
    searchPer() {
      this.$refs.userTableChild.pageData = {
        currPage: 1,
        pageSize: 10
      }
      this.getPsersonList(this.emp, this.$refs.userTableChild.pageData)
    },
    searchEmp() {
      this.initEmpPager()
      this.loadEmp(this.empSearch, this.empPager)
    },
    initEmpPager() {
      this.empPager = {
        total: 0,
        currPage: 1,
        pageSize: this.empPager.pageSize
      }
    },
    empSizeChange(val) {
      this.initEmpPager()
      this.empPager.pageSize = val
      this.loadEmp(this.empSearch, this.empPager)
    },
    empPageChange(val) {
      // 翻页
      this.empPager.currPage = val
      this.loadEmp(this.empSearch, this.empPager)
    },
    searchNoUse() {
      this.initEmpPager()
      this.loadEmp(this.empSearch, this.empPager)
    },
    empSelectionChange(val) {
      this.empSelection = val
    },
    addUser() {
    },
    confirmDelUser() {
      if (this.$refs.userTableChild.multipleSelection.length > 0) {
        this.$confirm('此操作将删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

          type: 'warning'
        })
          .then(() => {
            this.deleteUser()
          })
          .catch(() => { })
      } else {
        this.$message.error('未选中任何数据')
      }
    },
    deleteUser() {
      const userSns = []
      this.$refs.userTableChild.multipleSelection.forEach(val => {
        userSns.push(val)
      })
      userApi
        .deleteUser(userSns)
        .then(res => {
          if (res) {
            this.$message.success('删除成功')
            this.$refs.userTableChild.search()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    }
  }
}

</script>
<style lang="scss" scoped>
.app-container {
  text-align: left;
  padding: 10px;
}

.block {
  text-align: center;
  padding: 10px;
}
</style>
