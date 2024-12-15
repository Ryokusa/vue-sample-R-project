import { computed, reactive, toRefs, watch, watchEffect, type Ref } from 'vue'
import type { Todo } from './Todo'
import type { TodoFilterType } from './TodoFilterType'

export const useTodoMvcState = (filterType: Ref<TodoFilterType>) => {
  const STORAGE_KEY = 'vue-todomvc'

  const filters: Record<TodoFilterType, (todos: Todo[]) => Todo[]> = {
    all: (todos: Todo[]) => todos,
    active: (todos: Todo[]) => todos.filter((todo) => !todo.completed),
    completed: (todos: Todo[]) => todos.filter((todo) => todo.completed),
  }

  // state
  const state = reactive<{
    todos: Todo[]
    editedTodo: Todo | null
    allChecked: boolean
    newTodoInput: string
  }>({
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    editedTodo: null,
    allChecked: false,
    newTodoInput: '',
  })

  // derived state
  const filteredTodos = computed(() => filters[filterType.value](state.todos))
  const remaining = computed(() => filters.active(state.todos).length)

  // persist state
  watch(remaining, (newVal) => {
    state.allChecked = newVal === 0
  })

  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos))
  })

  function toggleAll() {
    state.todos.forEach((todo) => (todo.completed = state.allChecked))
  }

  function addTodo() {
    const value = state.newTodoInput.trim()
    if (value) {
      state.todos.push({
        id: Date.now(),
        title: value,
        completed: false,
      })
      state.newTodoInput = ''
    }
  }

  function removeTodo(todo: Todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  }

  let beforeEditCache = ''
  function editTodo(todo: Todo) {
    beforeEditCache = todo.title
    state.editedTodo = todo
  }

  function cancelEdit(todo: Todo) {
    state.editedTodo = null
    todo.title = beforeEditCache
  }

  function doneEdit(todo: Todo) {
    if (state.editedTodo) {
      state.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) removeTodo(todo)
    }
  }

  function removeCompleted() {
    state.todos = filters.active(state.todos)
  }

  return {
    ...toRefs(state),
    filteredTodos,
    remaining,
    toggleAll,
    addTodo,
    removeTodo,
    editTodo,
    cancelEdit,
    doneEdit,
    removeCompleted,
  }
}
