<template>
	<div>
        <div class="btn-style">
            <Button type="primary" @click="openModal('add')">新增数据</Button>
        </div>
		<Table border :columns="columns" :data="datas"></Table>
		<!--新增弹窗-->
		<Modal
	        v-model="modal1"
	        title="填写用户信息"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <div class="input-style">
		        <Input v-model="form.username" placeholder="请输入用户姓名" clearable style="width: 350px"></Input>
		    </div>
		    <div class="input-style"> 
		        <Input v-model="form.email" placeholder="请输入邮箱" clearable style="width: 350px"></Input>
		    </div>
		    <div class="input-style">
		        <Input v-model="form.phoneNo" placeholder="请输入手机号" clearable style="width: 350px"></Input>
	       </div>
	    </Modal>
	</div>
</template>
<script>
	import userApi from '../../api/user.api.js'
	export default {
        data () {
            return {
                columns: [
                    {
                        title: '姓名',
                        key: 'username',
                        align: 'center'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '手机号',
                        key: 'phoneNo',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                datas: [],
                modal1: false,
                form: {
                	username: '',
	                email: '',
	                phoneNo: ''
                },
                isUpdate: false
            }
        },
        methods: {
        	getInfos () {
        		userApi.getInfos().then(data=> {
        			this.datas = data.data
        		})
        	},
            openModal (index) {	
            	this.modal1 = true
                this.form = {}
                this.isUpdate = false
                if (index !== 'add') {
                    this.isUpdate = true
                    this.form = this.datas[index]
                }
            },
            ok () {
                if (this.isUpdate) {
                    this.editInfo(this.form)
                } else {
                    this.addInfo()
                }
                // this.getInfos()
            },
            addInfo () {
                userApi.addInfos(this.form).then(data => {
                    this.getInfos()
                })
            },
            editInfo (form) {
                userApi.updateInfos(form).then(data => {
                    this.getInfos()
                })
            },
            remove (index) {
                userApi.removeInfos(this.datas[index]._id).then(data => {
                    this.getInfos()
                })
                
            },
            cancel () {
                // this.$Message.info('Clicked cancel');
            }
        },
        mounted () {
        	this.getInfos()
        }
    }
</script>
<style lang="less" scoped>
.input-style {
	margin:10px;
}
.btn-style {
    margin-bottom: 20px;
}
</style>