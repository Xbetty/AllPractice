<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="姓名">
            <Input v-model="formItem.input" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="居住地">
            <Select v-model="formItem.select">
                <Option value="北京"></Option>
                <Option value="上海"></Option>
                <Option value="深圳"></Option>
                <Option value="杭州"></Option>
            </Select>
        </FormItem>
        <FormItem label="工作时间">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="select time" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="formItem.radio">
                <Radio label="男"></Radio>
                <Radio label="女"></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="爱好">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="吃零食"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="个人介绍">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请进行自我评价..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submitMsg">确定</Button>
             <Button type="primary" @click="submitMsgAnother">另一种跳转方式</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
import moment from 'moment'
    export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: '男',
                    checkbox: [],
                    date: '',
                    time: '',
                    textarea: ''
                }
            }
        },
        methods:{
            submitMsg () {
                if(this.formItem.input==''|this.formItem.select==''|this.formItem.date==''|this.formItem.time==''|this.formItem.radio==''|this.formItem.checkbox==''|this.formItem.textarea==''){
                    alert('请将信息填写完整！');
                }else{
                    //1.params方式传递参数
                    // this.$router.push({ name: 'btest',params: this.formItem})
                    //2.query方式传递参数
                    this.$router.push({ path: '/btest',query: this.formItem})
                    //用moment对时间进行格式化
                    console.log('时间格式化：', moment(this.formItem.date).format('YYYY-MM-DD'))
                }
               
            },
            submitMsgAnother () {
                console.log(this.formItem)
                this.$router.push({ path: '/ctest',query: this.formItem})
            }
        }

    }
</script>
