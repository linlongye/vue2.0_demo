<template>
    <div class="container">
        <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="name">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" v-model="password" id="password" class="form-control" placeholder="请输入密码">
        </div>
        <button class="btn btn-primary pull-right" @click="sumbit">登陆</button>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    data() {
        return {
            name: "",
            password: ""
        }
    },
    methods: {
        ...mapMutations(['setCookie', 'checkLogin']),
        sumbit() {
            let self = this;
            $.ajax({
                url: 'http://localhost:3000/login',
                type: 'POST',
                data: { username: self.name, password: self.password },
                success: function (data) {
                    if (data.success) {
                        self.setCookie();
                    }
                    self.$router.push('/');
                }
            })
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    beforeMount: function () {
        console.log(this.isLogin);
        if (this.isLogin) {
            this.$router.push('/');
        }
    }
}
</script>
<style>

</style>
