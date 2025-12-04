import { watch } from "vue"

export function creatSubscribe(pinia:any,id:string,scope:any){
    return function $subscribe(callback:any,option?:any){
        scope.run(()=>{
            watch(pinia.state.value[id],(newState:any)=>{
                callback({
                    storeId:id,
                },newState)
            },option)
        })
    }
}