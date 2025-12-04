
<template>
  <div>
    <h1>todolist</h1>
    <input type="text" v-model="newTodoTitle" placeholder="添加新任务">
    <button @click="addTodo">添加任务</button>
    <p>sss{{ todoStore.total }}</p>
    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <input type="checkbox" v-bind:checked="todo.completed" @change="todoStore.toggleTodo(todo.id)">
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="todoStore.deleteTodo(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../store/todolist2'
const todoStore = useTodoStore()
console.log(todoStore);


// todoStore.$onAction(({after,onError,name})=>{
//   console.log(todoStore.todos);
//   console.log(name);
//   after((res:any)=>{
//     console.log(todoStore.todos,res);
//   })
//   onError((err)=>{
//     console.log(err);
//   })
// })


let newTodoTitle = ref('')
function addTodo() {
  todoStore.addTodo({
    id: Date.now(),
    title: newTodoTitle.value,
    completed: false
  })
}


</script>