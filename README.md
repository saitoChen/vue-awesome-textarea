# vue-awesome-textarea
🐱Auto resize textarea component for Vue2.x

## Support

- [x] Vue2.x
- [ ] Vue3.x
- [ ] Typescript

## Install

```
npm install vue-awesome-textarea --save

// or

yarn add vue-awesome-textarea

```

### Usage

```
// main.js

import VueAwesomeTextarea from 'vue-awesome-textarea'

Vue.use(VueAwesomeTextarea)

// xxx.vue

<template>
  <vue-awesome-textarea />
</template>

```

### Option Props

- `autoResize` (`Boolean`, default: `false`)
  Auto resize the textarea
- `minHeight` (`Number`)
  Textarea's minHeight
- `maxHeight` (`Number`)
  Textarea's maxHeight, even set `autoResize: true`, maxHeight still effective

### Events

- `getRows` (`Params: row`)
  Emmited when `autoResize` is true and textarea rows has been changed

### LICENSE
MIT