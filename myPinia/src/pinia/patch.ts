import { isFunction, isObject } from "./tools"

export function creatPatch(pinia:any,id:string) {
    return function $patch(optionOrFn:any) {
        if(isFunction(optionOrFn)){
            optionOrFn(pinia.state.value[id])
        }else{  
            mergeOption(pinia.state.value[id],optionOrFn)
        }
    }
}

function mergeOption(state:any,option:any){
    for(let key in option){
        let oldValue=state[key]
        let newValue=option[key]
        if(isObject(oldValue)&&isObject(newValue)){
            mergeOption(oldValue,newValue)
        }else if(oldValue!==newValue){
            state[key]=newValue
        }
    }
}
