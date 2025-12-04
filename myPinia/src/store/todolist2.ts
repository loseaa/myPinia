import { defineStore } from "../pinia";
// import { computed, reactive, ref } from 'vue';
export const useTodoStore = defineStore("todo2", {
  state: () => ({
    todos: [
      { id: 1, title: "学习pinia", completed: false },
      { id: 2, title: "学习vue3", completed: true },
      { id: 3, title: "学习ts", completed: false },
    ],
    count: 0,
  }),
  actions: {
    addTodo(todo: { id: number; title: string; completed: boolean }) {
      this.todos.push(todo);
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo: any) => todo.id !== id);

    },
    toggleTodo(id: number) {
      this.todos = this.todos.map((todo: any) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },

  },
  getters: {
    total() {
      return this.todos.length;
    },
    doubleCount():any {
      return this.count * 2;
    },
  },
});
