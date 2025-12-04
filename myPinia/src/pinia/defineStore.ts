import { inject } from "vue";
import { isFunction, normaliseOption, PINIA } from "./tools";
import { creatSetupStore } from "./creratSetupStore";
import { creatOptionStore } from "./createOptionStore";

export function defineStore(id: string, setup: any) {
  let { _id, _setup, _option } = normaliseOption(id, setup);
  return function () {
    let pinia = inject(PINIA);
    if (!(pinia as any).store.has(_id)) {
      if (isFunction(_setup)) {
        creatSetupStore(_id, _setup, pinia);
      } else {
        creatOptionStore(_id,_option,pinia)
      }
    }

    return (pinia as any).store.get(_id);
  };
}
