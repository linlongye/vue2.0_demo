import Vue from 'vue'
import Vuex from 'vuex'

import * as cookie from '../common/cookie'

Vue.use(Vuex);

const state = {
    isLogin: false,
    tableData: []
}

const getters = {
    isLogin: function (state) {
        state.isLogin = cookie
            .getCookie('isLogin')
            .success;
        return state.isLogin;
    },
    tableData: function (state) {
        return state.tableData;
    }
}

const mutations = {
    checkLogin: function (state) {
        state.isLogin = cookie.getCookie('isLogin');
        return state.isLogin;
    },
    setCookie: function (state) {
        state.isLogin = true;
        console.log("setCookie" + state.isLogin);
        cookie.setCookie('isLogin', true);
    },
    logout: function (state) {
        console.log("logout");
        state.isLogin = false;
        cookie.setCookie('isLogin', '');
        cookie.deleteCookie('isLogin');
    },
    fillData: function (state, data) {
        if (data.length >= 1) {
            for (let i = 0; i < data.length; i++) {

                state
                    .tableData
                    .push(data[i]);
            }
        }
    },
    clearTableData: function (state) {
        state.tableData = [];
    },
    removeItemById: function (state, id) {
        for (let i = 0; i < state.tableData.length; i++) {
            if (state.tableData[i]._id == id) {
                state
                    .tableData
                    .splice(i, 1);
            }
        }
    }
}

export default new Vuex.Store({state, mutations, getters});