export function creatReset(state:any,store:any){
    return function $reset(){
        debugger
        let initialState=state()
        // store.$patch(initialState)
        store.$patch(()=>{
            Object.assign(store,initialState)
        })
    }
}