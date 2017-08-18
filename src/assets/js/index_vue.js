const Login = {
    template: `
    <form action="/login" method="post">
        <div class="container">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" class="form-control" id="username" placeholder="请输入用户名" name="username">
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="请输入密码">
            </div>
            <button class="btn btn-primary pull-right" id="btnLogin">登陆</button>
        </div>
    </form>`
}
const Detail = {
    template: `
    <div>
    <button class="btn btn-primary" data-toggle="modal"  v-on:click="open">添加</button>
    <br><br>
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
            <tr v-for="detail in details" class="text-center">
                <td>{{detail.name}}</td>
                <td>{{detail.longinName}}</td>
                <td>{{detail.password}}</td>
                <td hidden>{{detail._id}}</td>
                <td>
                    <button class="btn btn-primary" v-on:click="update(detail)">编辑</button>
                    <button class="btn btn-primary" v-on:click="remove(detail._id)">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
    
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                    <input type="password" class="form-control" id="password" placeholder="请输入密码" autocomplete="off" v-model="password" @focus="txtFocus">
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" id="pwdSave" v-on:click="submit" v-if="isShow">保存</button>
            <button type="button" class="btn btn-primary" id="pwdUpdate" v-if="!isShow" v-on:click="subupdate">更新</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    `,
    data: function () {
        return {
            details: [],
            name: '',
            longinName: '',
            password: '',
            id: '',
            old_pwd: '',
            isShow: true
        }
    },
    methods: {
        open() {
            this.name = '';
            this.longinName = '';
            this.password = '';
            this.isShow = true;
            this.id = "";
            $('#myModal').modal('show');
        },
        remove(id) {
            this
                .$http
                .get('/delete?_id=' + id)
                .then(function (res) {
                    if (res.data.success) {
                        this
                            .$router
                            .go(0);
                    }
                });
        },
        submit() {
            let new_pwd = {
                name: this.name,
                longinName: this.longinName,
                password: this.password
            };
            this
                .$http
                .post('/save', new_pwd)
                .then(function (res) {
                    if (res.data.success) {
                        $('#myModal').modal('hide');
                        this
                            .$router
                            .go(0);
                    }
                })
        },
        update(detail) {
            this.isShow = false;
            this.name = detail.name;
            this.longinName = detail.longinName;
            this.password = detail.password;
            this.id = detail._id;
            this.old_pwd = this.password;
            $('#myModal').modal('show');
        },
        subupdate() {
            let pwd = this.password;
            let new_pwd = {
                _id: this.id,
                name: this.name,
                longinName: this.longinName,
                password: this.password
            };
            if (this.old_pwd != this.password) {
                new_pwd.needCrypto = true; //如果现在的密码和之前的密码不同了 需要告诉后台在此加密
            } else {
                new_pwd.needCrypto = false;
            }
            this
                .$http
                .post('/update', new_pwd)
                .then(function (res) {
                    if (res.data.success) {
                        $('#myModal').modal('hide');
                        this
                            .$router
                            .go(0);
                    }
                });
        },
        txtFocus() {
            //this.old_pwd=this.password;
        }
    },
    created() {
        this
            .$http
            .get('/get')
            .then(function (res) {
                //console.log(res);
                this.details = res.data.data;
                //console.log(this.details);
            }, function (data) {
                console.log(data);
            });
    }

}

const routes = [
    {
        path: '/login',
        component: Login
    }, {
        path: '/detail',
        component: Detail
    }
]

const router = new VueRouter({routes})

var vm = new Vue({
    el: '#app',
    router,
    data: {
        todos: [
            {
                text: '学习 JavaScript'
            }, {
                text: '学习 Vue'
            }, {
                text: '整个牛项目'
            }
        ]
    },
    methods: {
        checkLogin() {
            //检查是否存在session cookie操作方法在源码里有或者参考网上的即可
            if (!this.getCookie('session')) {
                //如果没有登录状态则跳转到登录页
                this
                    .$router
                    .push('/login');
            } else {
                //否则跳转到登录后的页面
                this
                    .$router
                    .push('/detail');
            }
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document
                .cookie
                .split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') 
                    c = c.substring(1);
                if (c.indexOf(name) != -1) 
                    return c.substring(name.length, c.length);
                }
            return "";
        },
        clearCookie: function () {
            this.setCookie("session", "", -1);
        },
        //设置cookie
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            console.info(document.cookie);
        },
        logout: function () {
            if (this.getCookie('session')) {
                this.clearCookie();
            }
            this
                .$router
                .push('/login');
        },
        home() {
            alert(10);
            if (this.getCookie('session')) {
                this
                    .$router
                    .push('/detail');
            } else {
                this
                    .$router
                    .push('/login');
            }
        }
    },
    created() {
        this.checkLogin();
    }
});
