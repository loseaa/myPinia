import { isRef } from "vue";
import { creatSubscribe } from "./subscribe";
import { creatPatch } from "./patch";
import { creatOnAction } from "./onAction";

export function normaliseOption(id: any, setup: any) {
    let _id;
    let _setup;
    let _option;
    if(!setup){
        _id=id.id
        _option=id
    }
    else if(typeof setup === 'function'){
        _id=id
        _setup=setup
    }else{
        _id=id
        _option=setup
    }
    return {
        _id,
        _setup,
        _option
    }
}


export let PINIA=Symbol("pinia")
export function isFunction(node: any) {
   return typeof node === 'function'
}
export function isComputed(node: any) {
    return isRef(node) && (node as any).effect
}
export function isObject(node: any) {
    return typeof node === 'object' && node !== null
}

export function creatAPIs(pinia:any,id:string,scope:any){
    return {
        $patch:creatPatch(pinia,id),
        $id:id,
        $subscribe:creatSubscribe(pinia,id,scope),
        $onAction:creatOnAction(),
    }
}
