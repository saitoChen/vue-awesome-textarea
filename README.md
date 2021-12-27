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

## Usage

```
// main.js

import VueAwesomeTextarea from 'vue-awesome-textarea'

Vue.use(VueAwesomeTextarea)

// xxx.vue

<template>
  <vue-awesome-textarea />
</template>

```

## Option Props

- `autoResize` (`Boolean`, default: `false`)<br/>
  Auto resize the textarea, autoResize is effective after set v-model of textarea
- `minHeight` (`Number`)<br/>
  Textarea's minHeight, minHeight is effective after set `autoResize: true`
- `maxHeight` (`Number`)<br/>
  Textarea's maxHeight, maxHeight is effective after set `autoResize: true`

## Events

- `getRows` (`Params: row`)<br/>
  Emmited when `autoResize` is true and textarea rows has been changed

## LICENSE
MIT