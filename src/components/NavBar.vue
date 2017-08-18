<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" @click="home">密码管理</a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a @click="logoff">退出</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {

        };
    },
    methods: {
        ...mapMutations(['logout']),
        home() {
        },
        logoff() {
            this.logout();
            this.$router.push('/login');
        }
    }

}
</script>

<style>

</style>
