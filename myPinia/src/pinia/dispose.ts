import { onActionList } from "./onAction";

export function creatDispose(pinia: any,id:string,scope:any) {
  return function $dispose() {
    onActionList.length = 0;
    pinia.store.delete(id);
    scope.stop();
  };
}