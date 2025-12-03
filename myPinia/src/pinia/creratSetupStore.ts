import { effectScope, isReactive, isRef, reactive } from "vue"
import { isComputed } from "./tools"

export function creatSetupStore(id: string, setup: any, pinia: any) {
    let store=reactive({})
    pinia.state[id]||(pinia.state[id]={})
    let res=setup()
    for(let key in res){
        // 判断其不是计算属性
        if((isRef(res[key])&&!isComputed(res[key]))||isReactive(res[key])){
            pinia.state[id][key]=res[key]
        }
    }
    let scope=effectScope()
    // 设置父子作用域， effcetScope可用于停止响应式数据，更高级的用法
    
    let result=pinia.scope.run(()=>{
        return scope.run(()=>{
            return res
        })
    })
    pinia.store.set(id,store)
    Object.assign(store,result)
}
