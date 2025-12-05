import {  effectScope, isReactive, isRef, reactive } from "vue";
import { creatAPIs, isComputed, isFunction, runPlugins } from "./tools";
import { onActionList, subscribe } from "./onAction";
import { creatState } from "./creatState";

export function creatSetupStore(id: string, setup: any, pinia: any) {
  pinia.state.value[id] || (pinia.state.value[id] = {});
  

  let store: any;
  let scope;
  // 设置父子作用域， effcetScope可用于停止响应式数据，更高级的用法

  let result = pinia.scope.run(() => {
    scope = effectScope();
    store = reactive(creatAPIs(pinia, id, pinia.scope));
    return scope.run(() => {
        let res = setup();
          for (let key in res) {
    // 判断其不是计算属性
    if ((isRef(res[key]) && !isComputed(res[key])) || isReactive(res[key])) {
      pinia.state.value[id][key] = res[key];
    }

    if (isFunction(res[key])) {
      let fn = res[key];
      res[key] = function (...args: any[]) {
        let onErrorList: any = [];
        let afterList: any = [];
        let after = (fn: any) => {
          afterList.push(fn);
        };
        let onError = (fn: any) => {
          onErrorList.push(fn);
        };
        subscribe.run(onActionList, {
          name: key,
          store,
          after,
          onError,
        });
        let res;
        try {
          res = fn.apply(store, args);
          subscribe.run(afterList, res);
          return res;
        } catch (err) {
          subscribe.run(onErrorList, err);
          throw err;
        }
      };
    }
  }
      return res;
    });
  });
  pinia.store.set(id, store);
  creatState(pinia,id)
  Object.assign(store!, result);
  runPlugins(pinia,store);
}


