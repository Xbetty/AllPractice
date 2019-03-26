<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="changeMenu">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        信息管理页
                    </template>
                <router-link to="/infoManage"><MenuItem name="1-1"> 增删改查test</MenuItem></router-link>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                    </template>
                     <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
                   <MenuItem name="4-1" >
                        <Icon type="ios-navigate"></Icon>
                       <span @click="toMain">主页</span>
                    </MenuItem>
                  
                     <MenuItem name="5-1" >
                        <Icon type="search"></Icon>
                        <span  @click="toTesta">信息添加</span>
                    </MenuItem>
                   
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <router-view></router-view>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        methods: {
            changeMenu () {
                
            },
            toMain () {
                console.log("回到主页")
                this.$router.push({ name: 'Home'})
            }
            ,
            toTesta () {
                console.log("添加信息");
                this.$router.push({ name: 'atest'});
            }
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>