import { computed, effectScope, reactive, toRefs } from "vue";
import { creatPatch } from "./patch";

function creatAPIs(pinia:any,id:string){
    return {
        $patch:creatPatch(pinia,id),
        $id:id
    }
}

export function creatOptionStore(id:string,option:any,pinia:any){
    let store=reactive(creatAPIs(pinia,id))
    let state=option.state()||{}
    let scope=effectScope();
    pinia.state.value[id]=toRefs(reactive(state))
    let result=pinia.scope.run(()=>{
        scope.run(()=>{
            return makeUpStore(pinia,store,option,id)
        })
    })

    pinia.store.set(id,store)
    Object.assign(store,result)
}

function makeUpStore(pinia:any,store:any,option:any,id:string){
    let {actions,getters}=option
    let state=pinia.state.value[id]

    Object.assign(store,toRefs(state))
    actions=fixAction(actions,store)
    getters=fixGetter(getters,store)
    Object.assign(store,actions,toRefs(getters))
    return store
}

function fixAction(actions:any,store:any){
    actions=actions||{}
    for(let key in actions){
        let action=actions[key]
        if(typeof action==='function'){
            actions[key]=action.bind(store)
        }
    }
    return actions
}

function fixGetter(getters:any,store:any){
    getters=getters||{}

    console.log(store);
    for(let key in getters){
        let getter=getters[key]
        if(typeof getter==='function'){
            getters[key]=computed(()=>getter.apply(store))
        }
    }
    return getters
}

