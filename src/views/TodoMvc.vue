<!--
A fully spec-compliant TodoMVC implementation
https://todomvc.com/
-->

<script setup lang="ts">
import type { TodoMvcProps } from '@/compositions/TodoMvc/TodoMvcProps'
import { useTodoMvcState } from '@/compositions/TodoMvc/useTodoMvcState'
import { routeTodoMvc } from '@/router/routeUtils'
import { toRefs } from 'vue'

const props = defineProps<TodoMvcProps>()
const { filterType } = toRefs(props)

const {
  todos,
  filteredTodos,
  remaining,
  allChecked,
  newTodoInput,
  editedTodo,
  toggleAll,
  addTodo,
  removeTodo,
  editTodo,
  cancelEdit,
  doneEdit,
  removeCompleted,
} = useTodoMvcState(filterType)
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input
        class="new-todo"
        v-model="newTodoInput"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allChecked"
        @change="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? ' item' : ' items' }} left</span>
      </span>
      <ul class="filters">
        <li>
          <a href="#" @click="routeTodoMvc('all')" :class="{ selected: filterType === 'all' }">
            All
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="routeTodoMvc('active')"
            :class="{ selected: filterType === 'active' }"
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="routeTodoMvc('completed')"
            :class="{ selected: filterType === 'completed' }"
          >
            Completed
          </a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style scoped>
@import 'https://unpkg.com/todomvc-app-css@2.4.1/index.css';
</style>
