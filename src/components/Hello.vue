<template>
    <div>
        <button class="btn btn-primary" data-toggle="modal" @click="open">添加</button>
        <br>
        <br>
        <table class="table table-hover table-bordered table-condensed table-striped">
            <thead>
                <tr class="text-center">
                    <td>名称</td>
                    <td>账号</td>
                    <td>密码</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(detail,index) in tableData" :key="index" class="text-center">
                    <td>{{detail.name}}</td>
                    <td>{{detail.longinName}}</td>
                    <td>{{detail.password}}</td>
                    <td hidden>{{detail._id}}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(detail)">编辑</button>
                        <button class="btn btn-primary" @click="remove(detail._id)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">添加密码</h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="hidden" v-model="id">
                        <div class="form-group">
                            <label for="name" class="control-label">应用名称</label>
                            <input type="text" class="form-control" id="name" placeholder="请输入应用名称" autocomplete="off" v-model="name">
                        </div>
                        <div class="form-group">
                            <label for="longName">登录名称</label>
                            <input type="text" class="form-control" id="longName" placeholder="请输入登录名称" autocomplete="off" v-model="longinName">
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" id="password" placeholder="请输入密码" autocomplete="off" v-model="password">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" id="pwdSave" @click="submit" v-if="isShow">保存</button>
                        <button type="button" class="btn btn-primary" id="pwdUpdate" v-if="!isShow" @click="subupdate">更新</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            name: '',
            id: '',
            longinName: '',
            password: '',
            isShow: true,
            oldPassword: ''//原来的密码
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'tableData'])
    },
    beforeMount() {

    },
    mounted: function () {

        this.initData()

    },
    methods: {
        ...mapMutations(['checkLogin', 'clearTableData', 'removeItemById', 'fillData']),
        update: function (obj) {
            this.oldPassword = obj.password;
            this.isShow = false;
            this.fillModal(obj);
            $('#myModal').modal('show');
        },
        remove: function (obj) {
            let self = this;
            if (obj) {
                $.ajax({
                    url: 'http://localhost:3000/delete?_id=' + obj,
                    type: 'GET',
                    success: function (data) {
                        debugger;
                        if (data.success) {
                            self.$store.commit('removeItemById', obj);
                        }
                    }
                })
            }
        },
        initData: function () {
            let self = this
            if (!this.isLogin) {
                this.$router.push('/login');
            }
            else {
                $.ajax({
                    url: 'http://localhost:3000/get',
                    type: 'GET',
                    success: function (data) {
                        self.$store.commit('clearTableData');
                        self.$store.commit('fillData', data.data);
                    }
                })
            }
        },
        open: function () {
            this.oldPassword = "";
            this.isShow = true;
            this.initModal();
            $('#myModal').modal('show');
        },
        submit: function () {
            let self = this;
            let new_pwd = { _id: this.id, name: this.name, longinName: this.longinName, password: this.password };
            if (this.check()) {
                $.ajax({
                    url: "http://localhost:3000/save",
                    type: 'POST',
                    data: new_pwd,
                    success: function (data) {
                        if (data.success) {
                            $('#myModal').modal('hide');
                            //self.$router.go(0);
                            //self.$store.commit('fillData', [new_pwd]);
                            self.initData();
                        }
                        else {
                            alert("添加数据失败");
                        }
                    }
                })
            }
        },
        subupdate: function () {
            let self = this;
            let needCrypto = this.oldPassword == this.password ? false : true;
            if (this.check()) {
                console.log(this.oldPassword, this.password);
                $.ajax({
                    url: 'http://localhost:3000/update',
                    type: 'POST',
                    data: { _id: this.id, name: this.name, longinName: this.longinName, password: this.password, needCrypto: needCrypto },
                    success: function (data) {
                        if (data.success) {
                            $('#myModal').modal('hide');
                            self.$router.go(0);
                        } else {
                            alert('更新失败');
                        }
                    }
                })
            }
        },
        initModal: function () {
            this.name = '';
            this.id = "";
            this.longinName = "";
            this.password = ""
        },
        fillModal: function (obj) {
            this.id = obj._id;
            this.name = obj.name;
            this.longinName = obj.longinName;
            this.password = obj.password
        },
        check: function () {
            if (this.name != "" && this.longinName != "" && this.password != "") {
                return true;
            }
            return false;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table tbody tr td {
    vertical-align: middle;
}
</style>
