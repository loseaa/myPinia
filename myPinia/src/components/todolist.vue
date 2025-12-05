
<template>
  <div>
    <h1>todolist</h1>
    <input type="text" v-model="newTodoTitle" placeholder="添加新任务">
    <button @click="addTodo">添加任务</button>
    <button @click="todoStore.$dispose">清除响应式</button>
    <p>{{ todoStore.total }}</p>
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
import { useTodoStore } from '../store/todolist'
const todoStore = useTodoStore()
// console.log(todoStore);

// todoStore.$subscribe((mutation,state)=>{
//   console.log(mutation,state);
// })
// console.log(todoStore.$state);

setTimeout(() => {
  todoStore.$state={
  todos:[
    {
      id: 1,
      title: '学习 Vue 3',
      completed: false
    },
    {
      id: 2,
      title: '完成项目',
      completed: true
    }
  ],
  total: 2
}
}, 2000);


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