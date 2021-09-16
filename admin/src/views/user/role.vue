<template>
  <div class="app-container">
    <el-tabs
      v-model.trim="activeTabName"
      type="card"
      @tab-click="handleTabClick"
    >
      <!-------左边角色tab start------->
      <el-tab-pane
        label="角色"
        name="roleTab"
      >
        <el-row
          v-if="isAdmin"
          type="flex"
          justify="start"
          style="padding-bottom: 10px"
        >
          <el-button
            type="primary"
            plain
            size="mini"
            @click="addRoleDialog"
          >新增</el-button>
          <el-button
            plain
            size="mini"
            @click="deleteRoleDialog"
          >删除</el-button>
        </el-row>
        <el-table
          ref="multipleTable"
          v-loading="roleLoading"
          :data="roleTableData"
          border
          style="width: 100%"
          height="500"
          @selection-change="roleSelectionChange"
        >
          <el-table-column
            align="center"
            label="选择"
            width="60"
            fixed
          >
            <el-table-column
              align="center"
              type="selection"
              width="60"
              fixed
            />
          </el-table-column>
          <el-table-column
            label="角色编码"
            header-align="center"
          >
            <el-table-column prop="roleId">
              <template
                slot="header"
                slot-scope="{}"
              >
                <el-input
                  v-model.trim="role.roleId"
                  clearable
                  size="mini"
                  placeholder="搜索角色编码"
                  @change="searchRoleInfo"
                />
              </template>
              <template slot-scope="scope">
                <el-link @click="getDetail(scope.row)">{{
                  scope.row.roleId
                }}</el-link>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="角色名称"
            header-align="center"
          >
            <el-table-column prop="roleName">
              <template
                slot="header"
                slot-scope="{}"
              >
                <el-input
                  v-model.trim="role.roleName"
                  clearable
                  size="mini"
                  placeholder="搜索角色名称"
                  @change="searchRoleInfo"
                />
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="角色状态"
            header-align="center"
          >
            <el-table-column
              prop="roleStatus"
              :formatter="formatRoleStatus"
            >
              <template
                slot="header"
                slot-scope="{}"
              >
                <el-select
                  v-model.trim="role.roleStatus"
                  placeholder="搜索角色状态"
                  size="mini"
                  style="width:100%"
                  @change="searchRoleInfo"
                >
                  <el-option
                    v-for="item in roleTabOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="创建人"
            header-align="center"
          >
            <el-table-column prop="createUsername">
              <template
                slot="header"
                slot-scope="{}"
              >
                <el-input
                  v-model.trim="role.createUsername"
                  clearable
                  size="mini"
                  placeholder="搜索创建人"
                  @change="searchRoleInfo"
                />
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="创建时间"
            header-align="center"
            width="170"
          >
            <el-table-column
              prop="createTime"
              width="170"
            >
              <template
                slot="header"
                slot-scope="{}"
              >
                <el-date-picker
                  v-model.trim="role.createTime"
                  clearable
                  size="mini"
                  style="width:100%"
                  type="date"
                  placeholder="搜索创建时间"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="searchRoleInfo"
                />
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="170"
            fixed="right"
          >
            <el-table-column
              align="center"
              width="80"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="getDetail(scope.row)"
                >角色详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="deleteRole(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <!--//角色分页-->
        <div class="block">
          <el-pagination
            :current-page="rolePageData.currPage"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="rolePageData.pageSize"
            layout="total, prev, pager, next, jumper, sizes"
            :total="rolePageData.totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <!-- --------------------------删除角色Dialog start-------------------------- -->
        <el-dialog
          v-loading="deleteRoleLoading"
          title="删除角色"
          :visible.sync="deleteRoleDialogVisible"
          width="350px"
          :close-on-click-modal="false"
        >
          <span>是否确定删除这些角色？</span>

          <div style="width:100%; text-align:right">
            <el-button
              size="mini"
              @click="deleteRoleDialogVisible = false"
            >取消</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="submitDeleteRole"
            >确定</el-button>
          </div>
        </el-dialog>
        <!-- --------------------------删除角色Dialog end-------------------------- -->
      </el-tab-pane>
      <!-------左边角色tab end---------->
      <!--------右边角色详情tab start------>
      <el-tab-pane
        v-loading="userLoading"
        label="角色详情"
        name="roleDetailTab"
      >
        <el-row
          v-if="isAdmin"
          type="flex"
          justify="start"
        >
          <el-button
            type="primary"
            plain
            size="mini"
            @click="addRoleDialog"
          >新增</el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            @click="saveRole"
          >保存</el-button>
        </el-row>
        <el-form
          ref="roleDetailForm"
          :model="roleDetailForm"
          :rules="updateRoleRules"
          label-width="90px"
          label-position="right"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item
                label="角色编码:"
                prop="roleId"
                class="customRoleFormClass"
              >
                <el-input
                  v-model.trim="roleDetailForm.roleId"
                  style="width:170px"
                  :disabled="true"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="10"
              :pull="5"
            >
              <el-form-item
                label="角色状态:"
                prop="roleStatus"
                class="customRoleFormClass"
              >
                <el-select
                  v-model.trim="roleDetailForm.roleStatus"
                  style="width:170px"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item
                label="角色名称:"
                prop="roleName"
                class="customRoleFormClass"
              >
                <el-input
                  v-model.trim="roleDetailForm.roleName"
                  style="width:170px"
                  clearable
                  size="mini"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="10"
              :pull="5"
            >
              <el-form-item
                label="创建时间:"
                prop="createTime"
                class="customRoleFormClass"
              >
                <el-input
                  v-model.trim="roleDetailForm.createTime"
                  style="width:170px"
                  :disabled="true"
                  size="mini"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-tabs
          v-model.trim="activeSubTabName"
          style="margin-top:10px"
          @tab-click="handleTabClick"
        >
          <!-- --------------------------授权用户SubTab start-------------------------- -->
          <el-tab-pane
            label="授权用户"
            name="userSubTab"
          >
            <el-row
              v-if="isAdmin || isManager"
              type="flex"
              justify="start"
              style="padding: 10px"
            >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="addUsersDialog"
              >添加用户</el-button>
              <el-button
                plain
                size="mini"
                @click="deleteUsersDialog"
              >批量删除</el-button>
            </el-row>
            <el-table
              ref="multipleTable"
              :data="roleUserTableData"
              border
              style="width: 100%"
              max-height="630"
              @selection-change="roleUserSelectionChange"
            >
              <el-table-column
                align="center"
                label="选择"
                width="55"
                fixed
              >
                <el-table-column
                  type="selection"
                  align="center"
                  width="55"
                  fixed
                />
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                width="55"
              >
                <el-table-column
                  type="index"
                  width="55"
                  align="center"
                />
              </el-table-column>
              <el-table-column
                label="账号"
                header-align="center"
                :span="5"
              >
                <el-table-column prop="username" :span="5">
                  <template
                    slot="header"
                    slot-scope="{}"
                  >
                    <el-input
                      v-model.trim="roleUser.userame"
                      clearable
                      size="mini"
                      placeholder="搜索账号"
                      @change="searchRoleUser"
                    />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="用户名"
                header-align="center"
              >
                <el-table-column prop="usernameCn">
                  <template
                    slot="header"
                    slot-scope="{}"
                  >
                    <el-input
                      v-model.trim="roleUser.usernameCn"
                      clearable
                      size="mini"
                      placeholder="搜索用户名"
                      @change="searchRoleUser"
                    />
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column
                label="创建时间"
                header-align="center"
                :span="5"
              >
                <el-table-column
                  prop="createTime"
                  :span="5"
                >
                  <template
                    slot="header"
                    slot-scope="{}"
                  >
                    <el-date-picker
                      v-model.trim="roleUser.createTime"
                      clearable
                      size="mini"
                      style="width:100%"
                      type="date"
                      placeholder="搜索日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="searchRoleUser"
                    />
                  </template>
                </el-table-column>
              </el-table-column>
              <!--管理员不能被删除-->
              <el-table-column
                v-if="isAdmin"
                label="是否管理员"
                header-align="center"
                :span="5"
              >
                <el-table-column
                  :span="5"
                  prop="manager"
                >
                  <template slot="header">
                    <el-input
                      clearable
                      size="mini"
                      disabled
                      placeholder="搜索"
                    />
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model.trim="scope.row.manager"
                      @change="confirmManager(scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                v-if="isAdmin || isManager"
                fixed="right"
                label="操作"
                align="center"
                width="80"
              >
                <el-table-column
                  align="center"
                  width="80"
                  fixed="right"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      @click="deleteRoleUser(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                :current-page="roleUserPageData.currPage"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="roleUserPageData.pageSize"
                layout="total, prev, pager, next, jumper, sizes"
                :total="roleUserPageData.totalNum"
                @size-change="handleRoleUserSizeChange"
                @current-change="handleRoleUserCurrentChange"
              />
            </div>
            <!-- --------------------------添加用户Dialog start-------------------------- -->
            <!-- --------------------------添加用户Dialog start-------------------------- -->
            <el-dialog
              v-loading="addUserLoading"
              title="添加用户"
              width="80%"
              class="el-dialog-div"
              :close-on-click-modal="false"
              :visible.sync="addUserDialogVisible"
            >
              <el-table
                ref="multipleTable"
                height="300"
                width="600px"
                border
                :data="unauthUserTableData"
                @selection-change="unauthUserSelectionChange"
              >
                <el-table-column
                  align="center"
                  label="选择"
                  width="55"
                  fixed
                >
                  <el-table-column
                    type="selection"
                    align="center"
                    width="55"
                    fixed
                  />
                </el-table-column>

                <el-table-column
                  label="员工号"
                  header-align="center"
                >
                  <el-table-column prop="username">
                    <template
                      slot="header"
                      slot-scope="{}"
                    >
                      <el-input
                        v-model.trim="unauthUser.username"
                        clearable
                        size="mini"
                        placeholder="搜索员工号"
                        @change="searchUnauthUser"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  label="姓名"
                  header-align="center"
                >
                  <el-table-column prop="usernameCn">
                    <template
                      slot="header"
                      slot-scope="{}"
                    >
                      <el-input
                        v-model.trim="unauthUser.usernameCn"
                        clearable
                        size="mini"
                        placeholder="搜索姓名"
                        @change="searchUnauthUser"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  label="部门"
                  header-align="center"
                  min-width="250"
                >
                  <el-table-column
                    prop="partName"
                    min-width="250"
                  >
                    <template
                      slot="header"
                      slot-scope="{}"
                    >
                      <el-input
                        v-model.trim="unauthUser.partName"
                        clearable
                        size="mini"
                        placeholder="搜索部门"
                        @change="searchUnauthUser"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  label="岗位"
                  header-align="center"
                  min-width="120"
                >
                  <el-table-column
                    prop="partNo"
                    min-width="120"
                  >
                    <template
                      slot="header"
                      slot-scope="{}"
                    >
                      <el-input
                        v-model.trim="unauthUser.partNo"
                        clearable
                        size="mini"
                        placeholder="搜索岗位"
                        @change="searchUnauthUser"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  key="9"
                  label="状态"
                  header-align="center"
                  min-width="80px"
                >
                  <el-table-column
                    prop="status"
                    min-width="80px"
                  >
                    <template
                      slot="header"
                      slot-scope="{}"
                    >
                      <el-input
                        v-model.trim="unauthUser.status"
                        disabled
                        clearable
                        size="mini"
                        placeholder="状态"
                        @change="searchUnauthUser"
                      />
                    </template>
                    <template slot-scope="scope">
                      <span>{{ scope.row.status==0?'正常':'已作废' }}</span>
                    </template>
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  key="10"
                  label="员工条码"
                  header-align="center"
                  min-width="140px"
                >
                  <el-table-column
                    prop="barcode"
                    min-width="140px"
                  >
                    <template
                      slot="header"
                      slot-scope="{}"
                    >
                      <el-input
                        v-model.trim="unauthUser.barcode"
                        clearable
                        size="mini"
                        placeholder="搜索员工条码"
                        @change="searchUnauthUser"
                      />
                    </template>
                  </el-table-column>
                </el-table-column>

              </el-table>

              <div class="block">
                <el-pagination
                  :current-page="unauthUserPageData.currPage"
                  :page-sizes="[5, 10, 30, 50, 100]"
                  :page-size="unauthUserPageData.pageSize"
                  :total="unauthUserPageData.totalNum"
                  layout="total, prev, pager, next, jumper, sizes"
                  @size-change="handleUnauthUserSizeChange"
                  @current-change="handleUnauthUserCurrentChange"
                />
              </div>

              <div style="width:100%; text-align:right">
                <el-button
                  size="mini"
                  @click="addUserDialogVisible = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="submitAddRoleUsers"
                >确定</el-button>
              </div>
            </el-dialog>
            <!-- --------------------------批量删除Dialog start-------------------------- -->
            <el-dialog
              v-loading="deleteUsersLoading"
              title="批量删除"
              :visible.sync="deleteUsersDialogVisible"
              width="350px"
              :close-on-click-modal="false"
            >
              <span>是否确定删除这些用户？</span>

              <div style="width:100%; text-align:right">
                <el-button
                  size="mini"
                  @click="deleteUsersDialogVisible = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="submitDeleteUsers"
                >确定</el-button>
              </div>
            </el-dialog>
            <!-- --------------------------批量删除Dialog end-------------------------- -->
          </el-tab-pane>
          <!-- --------------------------授权用户SubTab end-------------------------- -->
          <!-- --------------------------授权菜单SubTab start -------------------------- -->
          <el-tab-pane
            v-if="isAdmin"
            label="授权菜单"
            name="menuSubTab"
          >
            <div style="text-align: left; padding: 10px">
              请勾选选项，启用此角色的菜单权限
            </div>
            <el-tree
              ref="tree"
              v-loading="menuLoading"
              :data="menuData"
              show-checkbox
              node-key="menuId"
              :props="defaultProps"
              default-expand-all
              :default-checked-keys="authMenus"
            />
          </el-tab-pane>

          <!-- --------------------------授权菜单SubTab end -------------------------- -->
        </el-tabs>
      </el-tab-pane>
      <!-- --------------------------新增角色Dialog start-------------------------- -->
      <el-dialog
        v-loading="addRoleLoading"
        title="新增角色"
        :visible.sync="addRoleDialogVisible"
        width="350px"
        :close-on-click-modal="false"
      >
        <el-form
          ref="roleForm"
          :model="roleForm"
          :rules="addRoleRules"
          label-width="80px"
          label-position="right"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
            required
          >
            <el-input
              v-model.trim="roleForm.roleName"
              clearable
              size="mini"
            />
          </el-form-item>

          <el-form-item
            label="角色状态"
            prop="roleStatus"
          >
            <el-radio-group v-model.trim="roleForm.roleStatus">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="创建人">
            <el-input
              v-model.trim="roleForm.createUsername"
              :disabled="true"
              size="mini"
            />
          </el-form-item>
        </el-form>

        <div style="width:100%; text-align:right">
          <el-button
            size="mini"
            @click="addRoleDialogVisible = false"
          >取消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="submitAddRole"
          >确定</el-button>
        </div>
      </el-dialog>

      <!-- --------------------------新增角色Dialog end-------------------------- -->
      <!-----右边角色详情tab end---------->
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { roleApi } from '@/api/roleApi'
// import { roleUserApi } from '@/api/roleUserApi'
// import { menuApi } from '@/api/menuApi'
// import { roleMenuApi } from '@/api/roleMenuApi'

export default {
  name: 'Role',
  data() {
    const checkRepeat = (rule, value, callback) => {
      // const roleInfo = {
      //   roleName: value
      // }
      // roleApi
      //   .checkRole(roleInfo)
      //   .then(res => {
      //     if (res === true) {
      //       callback()
      //     } else {
      //       callback(new Error('角色编码已存在'))
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //     callback(new Error('请求出错'))
      //   })
    }

    return {
      authUserList: [],
      isAddUser: true,
      options: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '停用'
        }
      ],
      addRoleRules: {
        roleId: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          { validator: checkRepeat, trigger: 'blur' }
        ]

      },

      roleTabOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '停用'
        }
      ],
      // 跳转到角色详情TAB
      activeTabName: 'roleTab',
      // 一个被选中的用户的用户详情数据
      roleDetailForm: {},
      // 是否为管理员
      isAdmin: false,

      userLoading: false,
      // 角色数据是否正在导入
      roleLoading: false,

      isManager: false,

      // 请求用户列表需要参数
      role: {},
      pageData: {
        currPage: 1,
        pageSize: 10,
        totalNum: 0
      },
      // 获得的用户列表信息
      roleTableData: [],
      rolePageData: {
        currPage: 1,
        pageSize: 10,
        totalNum: 0
      },
      // 是否正在新增角色
      addRoleLoading: false,
      // 新增角色对话框是否可见
      addRoleDialogVisible: false,
      // 新增角色数据
      roleForm: {},
      // 删除角色对话框是否可见
      deleteRoleDialogVisible: false,
      // 是否正在删除选中的角色数据
      deleteRoleLoading: false,

      updateRoleRules: {},

      activeSubTabName: 'userSubTab', //  角色详情tab

      // 请求角色列表需要参数（也许需要上面的pageData)
      roleUser: {},
      // 获得的授权角色列表
      roleUserTableData: [],
      roleUserPageData: {
        currPage: 1,
        pageSize: 10,
        totalNum: 0
      },
      authUserOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '在职'
        },
        {
          value: '0',
          label: '离职'
        }
      ],
      //   tree数据
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },

      // 添加用户对话框是否可见
      addUserDialogVisible: false,

      unauthUserOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '在职'
        },
        {
          value: '0',
          label: '离职'
        }
      ],

      deleteUsersDialogVisible: false,
      deleteUsersLoading: false,

      // 从未授权用户中新增授权用户
      addUserLoading: false,
      // 未授权用户page数据
      unauthUserPageData: {
        currPage: 1,
        pageSize: 5,
        totalNum: 0
      },
      // 未授权用户数据
      unauthUserTableData: [],
      unauthUser: {},
      /**
       * 授权菜单SubTab
       */
      menuLoading: false,
      authMenus: [],
      menuData: [],

      roleSelection: [],
      roleUserSelection: [],
      unauthUserSelection: []

    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  created() {
    this.getRoleList(this.role, this.pageData)
    if (this.name === '系统管理员') {
      this.isAdmin = true
    }
  },

  methods: {
    // 导入用户数据
    getRoleList(role, pageData) {
      // this.roleLoading = true
      // roleApi
      //   .searchRoles(role, pageData)
      //   .then(res => {
      //     if (res) {
      //       this.rolePageData.totalNum = res.total
      //       this.roleTableData = res.data
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
      //   .finally(() => {
      //     this.roleLoading = false
      //   })
    },
    // 搜索role
    searchRoleInfo() {
      this.rolePageData = {
        currPage: 1,
        pageSize: 10,
        totalNum: 0
      }
      this.getRoleList(this.role, this.rolePageData)
    },

    formatRoleStatus(row) {
      return row.roleStatus === '0' ? '正常' : '停用'
    },
    /**
     * 新增角色对话框
     */
    addRoleDialog() {
      this.addRoleDialogVisible = true
      this.roleForm = {
        roleId: '',
        roleName: '',
        roleStatus: '0',
        createUser: '',
        createTime: ''
      }
      //   var date = new Date()
      // this.roleForm.createTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getTime()
      this.roleForm.createUsername = this.name
      this.$nextTick(() => {
        this.$refs.roleForm.clearValidate('roleName')
      })
    },

    /**
     * 删除角色对话框
     */
    deleteRoleDialog() {
      this.deleteRoleDialogVisible = true
      if (this.roleSelection === undefined) {
        this.$message.error('未勾选需要删除的角色！')
        this.deleteRoleDialogVisible = false
      }
    },

    roleSelectionChange(val) {
      this.roleSelection = val
    },

    // Tab切换

    handleTabClick(tab, event) {
      // if (tab.name === 'roleTab') {
      //   this.getRoleList(this.role, this.rolePageData)
      // }
      // if (tab.name === 'roleDetailTab') {
      //   this.getDetail(this.roleTableData[0])
      // }
      // if (tab.name === 'menuSubTab') {
      //   this.menuLoading = true
      //   this.getMenuList()
      //   this.getRoleMenuList(this.roleDetailForm.roleId)
      // } else {
      //   this.authMenus = []
      //   this.activeSubTabName = 'userSubTab'
      // }
    },
    /**
     * 角色Tab上点击编辑后切换到用户详情Tab
     */
    getDetail(row) {
      // this.activeTabName = 'roleDetailTab'
      // this.roleDetailForm = row
      // this.isManager = row.manager
      // const roleUser = {
      //   roleId: row.roleId
      // }
      // this.getRoleUserList(roleUser, this.roleUserPageData)
    },

    findDetail(row) {
      this.roleDetailForm = row
      this.isManager = row.manager
      const roleUser = {
        roleId: row.roleId
      }
      this.getRoleUserList(roleUser, this.roleUserPageData)
    },
    /**
     * 提交新增角色数据
     */
    submitAddRole() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          // this.addRoleLoading = true
          // roleApi
          //   .addRole(this.roleForm)
          //   .then(res => {
          //     this.$message.success('添加成功')
          //     this.searchRoleInfo()
          //     this.addRoleDialogVisible = false
          //   })
          //   .catch(e => {
          //     this.$message.error(e)
          //   }).finally(() => {
          //     this.addRoleLoading = false
          //   })
        } else {
          return false
        }
      })
    },
    /**
     * 删除单个角色
     */
    deleteRole(row) {
      this.$confirm('确认删除？')
        .then(() => {
          const roleIds = []
          roleIds.push(row.roleId)
          // this.deleteRoleLoading = true
          // roleApi
          //   .deleteRoles(roleIds)
          //   .then(() => {
          //     this.deleteRoleDialogVisible = false
          //     this.$message.success('删除成功')
          //     this.searchRoleInfo()
          //   })
          //   .catch(e => {
          //     this.$message.error(e)
          //   })
          //   .finally(() => {
          //     this.deleteRoleLoading = false
          //   })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        }).finally(() => {
          this.deleteRoleLoading = false
        })
    },
    /**
     * 提交删除角色请求
     */
    submitDeleteRole() {
      const roleIds = []
      let roleWirhUser = 0
      this.roleSelection.forEach(val => {
        this.findDetail(val)
        if (this.roleUserTableData.length > 0) {
          roleWirhUser = roleWirhUser + 1
        }
        if (parseInt(val.roleId) >= 1011) {
          roleIds.push(val.roleId)
        }
      })

      if (roleIds.length === 0) {
        this.deleteRoleDialogVisible = false
        this.$message.error('该角色不允许删除')
        return
      }

      if (roleWirhUser > 0) {
        // this.deleteRoleLoading = true
        // roleApi
        //   .deleteRoles(roleIds)
        //   .then(res => {
        //     if (res) {
        //       this.deleteRoleDialogVisible = false
        //       this.$message.success('删除成功')
        //       this.getRoleList({}, this.rolePageData)
        //     } else {
        //       this.deleteRoleDialogVisible = false
        //       this.$message.error(res.message)
        //     }
        //   })
        //   .catch(e => {
        //     this.$message.error(e)
        //   })
        //   .finally(() => {
        //     this.deleteRoleLoading = false
        //   })
      } else {
        this.$message.error('不能删除存在授权用户的角色')
        this.deleteRoleDialogVisible = false
      }
    },

    /** ****************************** 用户详情Tab ************************* */
    /**
     * 查询角色的授权用户
     */
    getRoleUserList(roleUser, pageData) {
      // this.userLoading = true
      // roleUserApi
      //   .searchUsersByRole(roleUser, pageData)
      //   .then(res => {
      //     if (res) {
      //       this.roleUserPageData.totalNum = res.total
      //       this.roleUserTableData = res.data
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
      //   .finally(() => {
      //     this.userLoading = false
      //     this.addRoleLoading = false
      //   })
    },
    /**
     * 查询角色的未授权用户
     */
    getUnauthRoleUserList(roleUser, pageData) {
      // this.addUserLoading = true
      // roleUserApi
      //   .searchUsersNotInRole(roleUser, pageData)
      //   .then(res => {
      //     if (res) {
      //       this.unauthUserPageData.totalNum = res.total
      //       this.unauthUserTableData = res.data
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
      //   .finally(() => {
      //     this.addUserLoading = false
      //   })
    },
    /**
    * 添加用户对话框
    */
    addUsersDialog() {
      this.addUserDialogVisible = true
      this.unauthUser.roleId = this.roleDetailForm.roleId
      this.getUnauthRoleUserList(this.unauthUser, this.unauthUserPageData)
    },

    /**
    * 提交添加用户数据
    */
    submitAddRoleUsers() {
      const userIds = []
      this.unauthUserSelection.forEach(val => {
        userIds.push(val.userId)
      })
      if (userIds.length > 0) {
        // this.addUserLoading = true
        // roleUserApi
        //   .addUsersForRole(userIds, this.roleDetailForm.roleId)
        //   .then(res => {
        //     if (res) {
        //       this.addUserDialogVisible = false
        //       this.$message.success('添加成功')

        //       this.roleUser.roleId = this.roleDetailForm.roleId
        //       this.getRoleUserList(this.roleUser, this.roleUserPageData)
        //     } else {
        //       this.$message.error('添加失败')
        //     }
        //   })
        //   .catch(e => {
        //     this.$message.error(e)
        //   })
        //   .finally(() => {
        //     this.addUserLoading = false
        //   })
      } else {
        this.$message.error('请选择新增用户')
        this.addUserLoading = false
      }
    },

    /**
     * 为角色删除一个授权用户
     */
    deleteRoleUser(row) {
      this.userLoading = true
      this.$confirm('确认删除？')
        .then(() => {
          const userIds = []
          userIds.push(row.userId)
          // roleUserApi
          //   .deleteUsersForRole(userIds, this.roleDetailForm.roleId)
          //   .then(res => {
          //     if (res) {
          //       this.deleteUserDialogVisible = false
          //       this.$message.success('删除成功')
          //       this.roleUser.roleId = this.roleDetailForm.roleId
          //       this.getRoleUserList(this.roleUser, this.roleUserPageData)
          //     }
          //   })
          //   .catch(e => {
          //     this.$message.error(e)
          //   })
          //   .finally(() => {
          //     this.userLoading = false
          //   })
        })
        .catch(() => {
          this.$message.info('已取消删除')
          this.userLoading = false
        })
    },
    /**
     * 批量删除对话框
     */
    deleteUsersDialog() {
      this.deleteUsersDialogVisible = true
      if (this.roleUserSelection === undefined) {
        this.$message.error('未勾选需要删除的用户！')
        this.deleteUsersDialogVisible = false
      }
    },
    /**
     * 提交批量删除请求
     */
    submitDeleteUsers() {
      this.deleteUsersLoading = true
      const userIds = []
      this.roleUserSelection.forEach(val => {
        userIds.push(val.userId)
      })
      if (userIds.length > 0) {
        // roleUserApi
        //   .deleteUsersForRole(userIds, this.roleDetailForm.roleId)
        //   .then(res => {
        //     if (res) {
        //       this.deleteUsersDialogVisible = false
        //       this.$message.success('删除成功')
        //       this.roleUser.roleId = this.roleDetailForm.roleId
        //       this.getRoleUserList(this.roleUser, this.roleUserPageData)
        //     }
        //   })
        //   .catch(e => {
        //     this.$message.error(e)
        //   })
        //   .finally(() => {
        //     this.deleteUsersLoading = false
        //   })
      } else {
        this.$message.error('请选择用户')
        this.deleteUsersLoading = false
      }
    },
    /**
      * ******授权菜单********
     * 获取所有菜单
     */
    getMenuList() {
      // menuApi
      //   .getMenus()
      //   .then(res => {
      //     if (res) {
      //       this.menuData = res
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
    },

    /**
     * 获取角色授权菜单
     */
    getRoleMenuList(roleId) {
      // roleMenuApi
      //   .getRoleLeafMenuIds(roleId)
      //   .then(res => {
      //     if (res) {
      //       this.authMenus = res
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
      //   .finally(() => {
      //     this.menuLoading = false
      //   })
    },
    /** 保存用户详情 */
    saveRole() {
      this.$refs.roleDetailForm.validate(valid => {
        if (valid) {
          this.userLoading = true
          this.updateRoleInfo()
        }
      })
    },
    updateRoleInfo() {
      // roleApi
      //   .updateRole(this.roleDetailForm)
      //   .then(res => {
      //     if (res) {
      //       this.updateRoleMenu()
      //       this.$message.success('更新角色成功')
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
    },
    /** 更新角色授权菜单 */
    updateRoleMenu() {
      // const parentArr = this.$refs.tree.getHalfCheckedKeys()
      // const childArr = this.$refs.tree.getCheckedKeys()
      // const menuIdSet = parentArr.concat(childArr)
      // roleMenuApi
      //   .updateRoleMenus(menuIdSet, this.roleDetailForm.roleId)
      //   .then(res => {
      //     if (res) {
      //       this.$message.success('保存成功')
      //     } else {
      //       this.$message.error('保存失败')
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
      //   .finally(() => {
      //     this.userLoading = false
      //   })
    },
    confirmManager(row) {
      var msg = ''
      if (row.manager) {
        msg = '确认要给【' + row.usernameCn + '】授予管理员权限?'
      } else {
        msg = '确认要给【' + row.usernameCn + '】取消管理员权限?'
      }

      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.submitModify(row)
        })
        .catch(() => {
          row.manager = !row.manager
        })
    },
    submitModify(row) {
      this.userLoading = true
      // roleUserApi
      //   .updateUsersForRole(row)
      //   .then(res => {
      //     if (res) {
      //       this.$message.success('保存成功')
      //     } else {
      //       this.$message.error('保存失败')
      //       row.manager = !row.manager
      //     }
      //   })
      //   .catch(e => {
      //     this.$message.error(e)
      //   })
      //   .finally(() => {
      //     this.userLoading = false
      //   })
    },

    searchRoleUser() {
      this.roleUserPageData = {
        currPage: 1,
        pageSize: 10,
        totalNum: 0
      }
      this.roleUser.roleId = this.roleDetailForm.roleId
      this.getRoleUserList(this.roleUser, this.roleUserPageData)
    },

    searchUnauthUser() {
      this.unauthUserPageData = {
        currPage: 1,
        pageSize: 5,
        totalNum: 0
      }
      this.unauthUser.roleId = this.roleDetailForm.roleId
      this.getUnauthRoleUserList(this.unauthUser, this.unauthUserPageData)
    },

    // 授权用户的分页
    handleRoleUserSizeChange(val) {
      this.roleUserPageData.pageSize = val
      this.roleUser.roleId = this.roleDetailForm.roleId
      this.getRoleUserList(this.roleUser, this.roleUserPageData)
    },

    handleRoleUserCurrentChange(val) {
      this.roleUserPageData.currPage = val
      this.roleUser.roleId = this.roleDetailForm.roleId
      this.getRoleUserList(this.roleUser, this.roleUserPageData)
    },
    // 未授权用户的分页
    handleUnauthUserSizeChange(val) {
      this.unauthUserPageData.pageSize = val
      this.unauthUser.roleId = this.roleDetailForm.roleId
      this.getUnauthRoleUserList(this.unauthUser, this.unauthUserPageData)
    },

    handleUnauthUserCurrentChange(val) {
      this.unauthUserPageData.currPage = val
      this.unauthUser.roleId = this.roleDetailForm.roleId
      this.getUnauthRoleUserList(this.unauthUser, this.unauthUserPageData)
    },

    // 角色的分页
    handleSizeChange(val) {
      this.rolePageData.pageSize = val
      this.getRoleList(this.role, this.rolePageData)
    },
    handleCurrentChange(val) {
      this.rolePageData.currPage = val
      this.getRoleList(this.role, this.rolePageData)
    },

    hanldeClick(row) { },
    // 授权用户勾选框
    roleUserSelectionChange(val) {
      this.roleUserSelection = val
    },
    // 未授权用户勾选框
    unauthUserSelectionChange(val) {
      this.unauthUserSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 10px;
}
.el-dialog-div {
  height: 95%;
  overflow: auto;
}
.block {
  text-align: center;
  padding: 10px;
}
</style>
