import { effectScope, ref } from "vue";
import { PINIA } from "./tools";

export function createPinia() {
  let scope = effectScope();
  let store = new Map();
  let state = scope.run(() => ref({}));

  return {
    store,
    state,
    scope,
    install(app: any) {
        // 提供pinia实例
      app.provide(PINIA, this);
    },
  };
}
