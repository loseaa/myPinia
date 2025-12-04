<template>
    <div>
        <h1>count1</h1>
        <p>{{ store.count }}</p>
        <p>{{ store.doubleCount }}</p>
        <button @click="handlechange">CHANGE</button>
    </div>
</template>

<script setup>
import { useTodoStore } from '../store/todolist2'
const store = useTodoStore()
function handlechange() {
    store.$patch({
        count: 500
    })
    // store.$patch((state) => {
    //     // console.log(state);
    //     state.count = 500;
    // })
}

</script>
