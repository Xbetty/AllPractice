<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">信息添加成功！</p>
            <p>姓名：{{form.input}}</p>
            <p>居住地：{{form.select}}</p>
            <p>工作时间：{{form.date}} {{form.time}}</p> 
            <p>性别：{{form.radio}}</p> 
            <p>爱好：
                <span v-for="(item, index) in form.checkbox" :key="index">
                    {{item}}
                    <span v-if="!(index === form.checkbox.length - 1)">,</span>
                </span>
            </p>
            <p>个人介绍：{{form.textarea}}</p> 
        </Card>
    </div>
</template>
<script>
//导入moment
import moment from 'moment'
    export default {
        data (){
            return {
                form: {
                    input: '',
                    select: '',
                    radio: '',
                    checkbox: [],
                    date: '',
                    time: '',
                    textarea: ''
                },
            }
        },
        mounted () {
            //1.params方式获取传递的参数
            // let params = this.$route.params
            // this.form.input = params.input
            // this.form.select = params.select
            // this.form.radio=params.radio
            // //格式化时间再输出
            // this.form.date=moment(params.date).format('YYYY-MM-DD')
            // this.form.time=params.time
            // this.form.checkbox=params.checkbox
            // this.form.textarea=params.textarea
            // console.log("params:"+params)
            //-----------------------------------
            //2.query方式获取传递的参数
            let query = this.$route.query
            this.form.input = query.input
            this.form.select = query.select
            this.form.radio=query.radio
            //格式化时间再输出
            this.form.date=moment(query.date).format('YYYY-MM-DD')
            this.form.time=query.time
            this.form.checkbox=query.checkbox
            this.form.textarea=query.textarea
            console.log("query:"+query)
        }
    }
</script>

