<template>
  <div>
    <div class="topToolBar">
      <a-button class="btn_success" @click="showAddNew">新增</a-button>
      <!-- <a-button type="primary" icon="import">导入</a-button> -->
    </div>
    <a-table bordered
    :row-key="record => record.UserID"
    :data-source="tbMainData"
    :columns="tbMainHead"
      :customRow="rowClick">
      <img class="tableImg" :onerror="$global.defaultImg"  slot="pic" slot-scope="text" :src="text" />
    </a-table>
    <a-drawer title="编辑" width="50%" destroyOnClose :visible="isDrawerShow" @close="isDrawerShow=false">

      <a-form-model ref="checkForm" :model="formData" :rules="formRule">

        <a-row type="flex" justify="space-between" >
          <a-col :span="10">
            <a-upload
              :action="$global.uploadUrl"
              list-type="picture-card"
              :file-list="previewImgList"
              @preview="isImgPreview=true"
              @change="changeImage">
               <div v-if="previewImgList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传
                  </div>
               </div>
            </a-upload>
            <a-modal :visible="isImgPreview" :closable="false" :footer="null" @cancel="isImgPreview=false">
              <img alt="预览图片失败" class="wid100" :src="formData.AvatarUrl" />
            </a-modal>
          </a-col>
          <a-col :span="13">
            <a-row type="flex" align="middle" >
              <a-col :span="24" :flex="1">
                <a-form-model-item label="昵称" prop="NickName" :labelCol="{span:4}" :wrapperCol="{span:20}">
                  <a-input v-model="formData.NickName" />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item label="姓名" prop="UserName" :labelCol="{span:4}" :wrapperCol="{span:20}">
                  <a-input v-model="formData.UserName" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-col>

        </a-row>
        <a-row type="flex" justify="space-between" >
          <a-col :span="11">
            <a-form-model-item label="手机号" prop="TelephoneNumber">
              <a-input-number class="wid100" v-model="formData.TelephoneNumber" />
            </a-form-model-item>
          </a-col>
          <a-col :span="11">
            <a-form-model-item label="邮箱" >
              <a-input v-model="formData.Email" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-between" >
          <a-col :span="11">
            <a-form-model-item label="生日" >
              <a-date-picker valueFormat="YYYY-MM-DD" v-model="formData.Birthdate" />
            </a-form-model-item>
          </a-col>
          <a-col :span="11">
             <a-form-model-item label="性别" >
                <a-radio-group v-model="formData.Sex">
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
             </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="地址" >
          <a-input v-model="formData.OrgAddress" />
        </a-form-model-item>
      </a-form-model>

      <div class="drawerFoot">
        <div class="footFixedArea">
          <a-button @click="isDrawerShow=false">
            取消
          </a-button>
          <a-button type="primary" @click="submitData">
            提交
          </a-button>
        </div>
      </div>
    </a-drawer>

  </div>
</template>

<script>
  const tbMainHead = [{
      title: '图片',
      dataIndex: 'AvatarUrl',
      scopedSlots: {
        customRender: 'pic'
      },
    },
    {
      title: '昵称',
      dataIndex: 'NickName',
    },
    {
      title: '姓名',
      dataIndex: 'UserName',
    },
    {
      title: '手机号',
      dataIndex: 'TelephoneNumber',
    },
    {
      title: '邮箱',
      dataIndex: 'Email',
    },
    {
      title: '是否绑定微信',
      dataIndex: 'IsBindingWechat',
      customRender: (text, row, index) => {
        if (text) {
          return "是";
        }
        return '否';
      },
    }
  ];
  const formRule={
        NickName: [{
          required: true,
          message:"昵称不能为空",
          trigger: 'change'
        }],
        UserName: [{
            required: true,
            message:"用户名不能为空",
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '姓名长度需在2到5个字符',
            trigger: 'blur'
          },
        ],
        TelephoneNumber: [{
          required: true,
          message:"手机号不能为空",
          trigger: 'change'
        }],
      }
  export default {
    data() {
      return {
        tbMainData: [],
        tbMainHead,
        formRule,
        isDrawerShow: false,
        isImgPreview: false,
        previewImgList:[],
        formData: {
          AvatarUrl:"",
          NickName: '',
          UserName: '',
          TelephoneNumber: '',
          Email: '',
          OrgAddress: '',
          Birthdate: '',
          Sex: '',
        },
      }
    },
    mounted() {
      this.getData();
      this.tbMainHead.push()
    },
    methods: {
      submitData() {
        this.$refs.checkForm.validate(valid => {
          if (valid) {
            console.log('check ok, to submit');
            console.log(this.formData);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getData() {
        this.$http.postHttp("GetUserList",{
					OrganizationID:1,
					PageIndex:1,
					PageSize:20,
					ConditionField:"",
					ConditionValue:"",
				}, (res) => {
          // console.log("返回结果", res);
          if(res){
            res.map(item=>{
              if(item.HeadImage){
                item.AvatarUrl=this.$global.formatImage(item.HeadImage);
              }
              item.Birthdate=this.$global.formatTime(item.Birthdate);
            })
            this.tbMainData=res
          }

        })
      },
      showAddNew() {
        this.formData = {};
        this.previewImgList=[];
        this.isDrawerShow = true;
      },
      rowClick(record, index) {
        return {
          on: {
            click: () => {
              // console.log(record)
              this.formData = {...record};
              if(this.formData.AvatarUrl){
                this.previewImgList=[{
                  uid: '-1',
                  name: 'Photo',
                  status: 'done',
                  url:this.formData.AvatarUrl,
                }]
              }else{
                 this.previewImgList=[]
              }
              this.isDrawerShow = true;
            }
          }
        }
      },
      changeImage(e){
        // console.log(2,e);
        let status=e.file.status
        if(status=="removed"){
          this.previewImgList=[]
        }else if(status=="done"){
          this.formData.AvatarUrl = e.file.response.data;
        }else{
          this.previewImgList=e.fileList;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .moduleAll {}
</style>
