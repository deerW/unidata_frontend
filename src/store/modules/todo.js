import { getTodoList, putTodoChange } from '@/api/todo'

const todoStoreModule = {
  state: {
    todoList: []
  },

  actions: {
    async GetTodoData({ rootState, commit }) {
      const userId = rootState.user.id
      if (!userId) return
      const todoData = await getTodoList({ userId })

      const { todos } = todoData

      commit('SET_TODO_LIST', todos)
    },

    async PutTodoChange({ commit }, { id, desc }) {
      return putTodoChange(id, desc).then((res) => {
        return Promise.resolve(res)
      }).catch(err => {
        return Promise.reject(err)
      })
    }
  },

  mutations: {
    'SET_TODO_LIST'(state, todoList) {
      state.todoList = todoList
    }
  }
}

export default todoStoreModule
