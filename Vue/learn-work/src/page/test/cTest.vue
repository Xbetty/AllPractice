<template>
    <Table :columns="columns1" :data="data1">
    </Table>
</template>

<script>
import userApi from '../../api/user.api.js'
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '居住地',
                        key: 'address'
                    },
                    {
                        title: '工作时间',
                        key: 'time'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '爱好',
                        key: 'hobby'
                    },
                    {
                        title: '个人介绍',
                        key: 'personal'
                    }

                ],
                data1: [
                   
                ]
            }
        },
        methods: {
            getMsg(){
                userApi.getMsg().then((data) => {
                    console.log(data)
                    this.data1=data.data
                }).catch((err) => {
                    console.log('出问题了')
                });
            }
        },
        mounted () {
            this.getMsg()
        },
        // created:function(){
                        // var _this = this
        //             var xhr =new XMLHttpRequest
        //             xhr.open("GET",'http://localhost:8080/static/data.json',true)
        //             xhr.send(null)
        //             xhr.onreadystatechange=function(){
        //                 if(xhr.readyState==4&&xhr.status==200){
        //                     let res=JSON.parse(xhr.responseText);
        //                     let _this=this
        //                     console.log(xhr.responseText)
        //                     _this.data1=res.data
        //                     console.log(_this.data1)
        //                     console.log(_this)
        //                 }
        //             }
		// 		}
        
      
    }
</script>