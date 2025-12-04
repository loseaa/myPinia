import { computed, effectScope, reactive, toRefs } from "vue";
import { creatReset } from "./reset";
import { creatAPIs } from "./tools";
import { subscribe } from "./onAction";
import { onActionList } from "./onAction";

export function creatOptionStore(id: string, option: any, pinia: any) {
  let store;
  let state = option.state() || {};
  let scope: any;
  pinia.state.value[id] = toRefs(reactive(state));
  let result = pinia.scope.run(() => {
    scope = effectScope();
    scope.run(() => {
      store = reactive(creatAPIs(pinia, id, scope));
      return makeUpStore(pinia, store, option, id);
    });
  });
  pinia.store.set(id, store);
  Object.assign(store!, result);
  pinia.store.get(id).$reset = creatReset(option.state, store);
}

function makeUpStore(pinia: any, store: any, option: any, id: string) {
  let { actions, getters } = option;
  let state = pinia.state.value[id];

  Object.assign(store, state);
  actions = fixAction(actions, store);
  getters = fixGetter(getters, store);
  Object.assign(store, actions, toRefs(getters));
  return store;
}

function fixAction(actions: any, store: any) {
  actions = actions || {};
  for (let key in actions) {
    let action = actions[key];
    const afterList: any = [];
    const onErrorList: any = [];
    if (typeof action === "function") {
      actions[key] = (...args: any[]) => {
        function after(fn: any) {
          subscribe.add(afterList, fn);
        }
        function onError(fn: any) {
          subscribe.add(onErrorList, fn);
        }
        subscribe.run(onActionList, {
          name: key,
          store,
          onError,
          after,
        });
        let res;
        try {
          res = action.bind(store)(...args);

        } catch (err) {
          subscribe.run(onErrorList, err);
        }
        subscribe.run(afterList, res);
        return res;
      };
    }
  }
  return actions;
}

function fixGetter(getters: any, store: any) {
  getters = getters || {};

  console.log(store);
  for (let key in getters) {
    let getter = getters[key];
    if (typeof getter === "function") {
      getters[key] = computed(() => getter.apply(store));
    }
  }
  return getters;
}
