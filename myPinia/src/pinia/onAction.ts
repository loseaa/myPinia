export function creatOnAction(){
    return function onAction(callback:any){
        subscribe.add(onActionList,callback)
    }
}

export const onActionList=[]
export const subscribe={
    add(list:any,cb:any){
        list.push(cb)
    },
    run(list:any,data:any){
        list.forEach((cb:any)=>{
            cb(data)
        })
    }
}
