import { effectScope, isReactive, isRef, reactive } from "vue"
import { isComputed } from "./tools"
import { creatPatch } from "./patch"

function creatAPIs(pinia:any,id:string){
    return {
        $patch:creatPatch(pinia,id),
        $id:id
    }
}

export function creatSetupStore(id: string, setup: any, pinia: any) {
    pinia.state.value[id]||(pinia.state.value[id]={})
    let res=setup()
    for(let key in res){
        // 判断其不是计算属性
        if((isRef(res[key])&&!isComputed(res[key]))||isReactive(res[key])){
            pinia.state.value[id][key]=res[key]
        }
    }
    let store=reactive(creatAPIs(pinia,id))
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
