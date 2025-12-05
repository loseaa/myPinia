export function creatState(pinia:any,id:string) {
    let store=pinia.store.get(id)
    Object.defineProperty(store,"$state",{
        get(){
            return pinia.state.value[id]
        },
        set(newVal){
            store.$patch((state:any )=>{
                Object.assign(state,newVal)
            })
        }
    })
}