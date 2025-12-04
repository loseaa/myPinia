import { defineStore } from '../pinia'
import { computed, reactive, ref } from 'vue';
export const useTodoStore = defineStore('todo',()=>{
  
  let todos = ref([
    {id:1,title:'学习pinia',completed:false},
    {id:2,title:'学习vue3',completed:true},
    {id:3,title:'学习ts',completed:false}
  ])
  let count = ref(0)
  let test=reactive({
    a:1,
    b:2
  })
  function addTodo(todo: { id: number; title: string; completed: boolean }) {
    todos.value.push(todo)
  }
  function deleteTodo(id: number) {
    todos.value = todos.value.filter((todo:any) => todo.id !== id)
  }
  function toggleTodo(id: number) {
  
    todos.value = todos.value.map((todo:any) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
  }
  let total = computed(() => todos.value.length)
  let doubleCount = computed(() => count.value * 2)
  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    total,
    test,
    count,
    doubleCount
  }

})
