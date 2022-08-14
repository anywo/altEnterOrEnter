# `altEnterOrEnter`

> Enter 发送，Alt+Enter 换行
> Alt+Enter按下时，在光标位置插入换行
> 支持vue2.0和vue3.0

## Vue2.0
```javascript
// 全局引用
import altEnterOrEnter from "altenterorenter";

Vue.directive("altEnterOrEnter", altEnterOrEnter);
```

```html
<template>
  <textarea v-alt-enter-or-enter="handleEnter"></textarea>
</template>

<script>
// 局部引用
import altEnterOrEnter from "altenterorenter";

export default {
  directives: { altEnterOrEnter },
  methods: {
    handleEnter(e) {
      console.log("Enter", e);
    }
  }
}
</script>
```

## Vue3.0
```javascript
import { createApp } from "vue";
// 全局引用
import altEnterOrEnter from "altenterorenter";

const app = createApp({});
app.directive("altEnterOrEnter", altEnterOrEnter);
app.mount("#app");
```

```html
<template>
  <textarea v-alt-enter-or-enter="handleEnter"></textarea>
</template>

<script>
// 局部引用
import altEnterOrEnter from "altenterorenter";
export default {
  directives: { altEnterOrEnter },
  setup(){
    handleEnter(e) {
      console.log("Enter", e);
    }

    return { handleEnter }
  }
}
</script>
```