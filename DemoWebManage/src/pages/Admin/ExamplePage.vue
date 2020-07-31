<template>
	<div>
		<div class="topToolBar">
			<a-button class="btn_success" @click="showAddNew">新增</a-button>
			<a-button type="primary" icon="import">导入</a-button>
		</div>
		<a-table bordered :row-key="record => record.UserID" :data-source="tbMainData" :columns="tbMainHead"
		 :customRow="rowClick">
			 <img class="tableImg" :onerror="$global.defaultImg"  slot="pic" slot-scope="text" :src="text" />
		</a-table>
		<a-drawer title="编辑" width="50%" destroyOnClose :visible="isDrawerShow" @close="isDrawerShow=false">
			
      <a-form-model ref="checkForm" :model="formData" :rules="formRule">
        <a-row type="flex" justify="space-between" >
          <a-col :span="11">
            <a-form-model-item label="姓名" prop="name">
            	<a-input v-model="formData.name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="11">
           <a-form-model-item label="年龄" prop="age">
           	<a-input-number v-model="formData.age" />
           </a-form-model-item>
          </a-col>
        </a-row>
			
				<a-form-model-item label="性别">
					<a-radio-group v-model="formData.sex">
						<a-radio value="1">
							男
						</a-radio>
						<a-radio value="2">
							女
						</a-radio>
					</a-radio-group>
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
			dataIndex: 'HeadImg',
			// width: '40%',
			scopedSlots: {
				customRender: 'pic'
			},
		},
		{
			title: '姓名',
			dataIndex: 'name',
		},
		{
			title: '年龄',
			dataIndex: 'age',
		},
		// {
		// 	title: '操作',
		// 	dataIndex: 'operation',
		// 	// scopedSlots: { customRender: 'operation' },
		// },
	];
  const formRule={
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '姓名长度需在2到5个字符',
							trigger: 'blur'
						},
					],
					age: [{
						required: true,
						message: '请输入年龄',
						trigger: 'change'
					}],
	};
	export default {
		data() {
			return {
				tbMainData: [],
				tbMainHead,
				isDrawerShow: false,
				formData: {
					name: '',
					age: '',
					sex: '',
				},
				formRule,
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			submitData() {
				this.$refs.checkForm.validate(valid => {
					if (valid) {
						console.log('check ok, to submit');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getData() {
				// this.$http.postHttp("GetAllUser","",(res)=>{
				// console.log("返回结果",res);
				// if(res){
				this.tbMainData = [{
						UserID: 13,
						HeadImg: 'https://csdnimg.cn/medal/chizhiyiheng@240.png',
						name: '张三',
						age: '12',
						sex: "1"
					},
					{
						UserID: 16,
						HeadImg: 'https://csdnimg.cn/medal/qixiebiaobing1@240.png',
						name: '王五',
						age: '18',
						sex: "2"
					}
				]
				// }
				// })
			},
			showAddNew() {
				this.formData = {};
				this.isDrawerShow = true;
			},
			rowClick(record, index) {
				return {
					on: {
						click: () => {
							console.log(record, index)
							this.formData = record;
							this.isDrawerShow = true;
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.moduleAll {}
</style>
