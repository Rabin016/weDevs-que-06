import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const uri = "http://localhost:5000/api/todos";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todolist: null,
        msg: null,
    },
    getters: {
        getAllTodo: state => state.todolist,
        getCompletedTodo: state =>
            state.todolist.filter(({ completed }) => completed),
        getUncompletedTodo: state =>
            state.todolist.filter(({ completed }) => !completed),
    },
    mutations: {
        setTodoList: (state, payload) => {
            state.todolist = payload;
        },
        setMsg: (state, payload) => {
            state.msg = payload;
        },
    },
    actions: {
        fetchTodos: async ({ commit }) => {
            const { data } = await axios.get(uri);
            commit("setTodoList", data);
        },
        addTodo: async ({ commit, dispatch }, payload) => {
            const { data } = await axios.post(uri, { todoName: payload });
            commit("setMsg", data);
            dispatch("fetchTodos");
        },
        deleteTodos: async ({ dispatch }, payload) => {
            await fetch(uri, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ids: payload,
                }),
            });
            dispatch("fetchTodos");
        },
        updateTodo: async ({ dispatch }, payload) => {
            await axios.patch(`${uri}/${payload.id}`, {
                todoName: payload.todoName,
                completed: payload.completed,
            });
            dispatch("fetchTodos");
        },
        completedTodo: async ({ dispatch }, payload) => {
            await axios.patch(`${uri}/${payload.id}`, {
                todoName: payload.todoName,
                completed: payload.completed,
            });
            dispatch("fetchTodos");
        },
    },
    modules: {},
});
