## css-vars2value

A simple plugin to convert css variables to value

## Installation

```shell
$ npm install css-vars2value

# or

$ yarn add css-vars2value
```

## NOTE

# Do not skip!

This plugin can't processes variables like this below!

```css
.col{
    width(--col-width)
}

.col-3{
    --col-width: 33.333%;
}
```

```html
<div class="col col-3"></div>
```

## Examples

make this

```css
/* input css */
*,
:before,
:after {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-transform: translateX(var(--tw-translate-x)) translateY(
      var(--tw-translate-y)
    )
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(
      var(--tw-scale-x)
    )
    scaleY(var(--tw-scale-y));
  --tw-border-opacity: 1;
  border-color: rgba(242, 242, 242, var(--tw-border-opacity));
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-blur: var(--tw-empty);
  --tw-brightness: var(--tw-empty);
  --tw-contrast: var(--tw-empty);
  --tw-grayscale: var(--tw-empty);
  --tw-hue-rotate: var(--tw-empty);
  --tw-invert: var(--tw-empty);
  --tw-saturate: var(--tw-empty);
  --tw-sepia: var(--tw-empty);
  --tw-drop-shadow: var(--tw-empty);
  --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(
      --tw-grayscale
    )
    var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.tw .transform {
  -webkit-transform: var(--tw-transform);
  transform: var(--tw-transform);
}

.tw .border-black {
  --tw-border-opacity: 1;
  border-color: rgba(0, 0, 0, var(--tw-border-opacity));
}

.v-2:after {
  content: "";
  pointer-events: none;
  z-index: 30;
  height: 100%;
  width: 100%;
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
  opacity: 0.25;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#go-top:active {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 151, 245, var(--tw-bg-opacity));
}

.v-poster .info .title {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.v-poster .info a:hover {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  text-decoration: underline;
}
```

to this

```css
/* output css */
*,
:before,
:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

*,
:before,
:after {
  border-color: #f2f2f2;
}

.tw .transform {
  -webkit-transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(
      1
    )
    scaleY(1);
  transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1)
    scaleY(1);
}

.tw .border-black {
  border-color: black;
}

.v-2:after {
  content: "";
  pointer-events: none;
  z-index: 30;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.25;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#go-top:active {
  background-color: #0097f5;
}

.v-poster .info .title {
  color: white;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.v-poster .info a:hover {
  color: white;
  text-decoration: underline;
}
```

## Usage

```javascript
//  node js
const vars2value = require("css-vars2value");
const path = require("path");

vars2value({
  input: path.resolve(__dirname, "./index.css"),
  output: path.resolve(__dirname, "./output.css"),
  rootSelector: "*, :before, :after",
});

// or

const output = vars2value({
  data: "a{--var1:#f20;color:var(--var1)}",
});
console.log(output);
```

## options

### rootSelector

type: [optional] string

default: ""

#### descriptions:
this option is used to replace some libraries

not inject global vars in the root selector

like tailwind injected global vars in "\*, :before, :after"

so if you using tailwind, set rootSelector = "\*, :before, :after"

> if the css source was compressed, 
> 
> pls make sure this option also be compressed
> 
> "*,:before,:after"
> 

### data

type: [optional] string

default: undefined

#### descriptions: 
css input string

### input

type: [optional] string

default: undefined

#### descriptions: 
css input file path

### output

type: [optional] string

default: undefined

#### descriptions:
css output file path

### defaultVars

type: [optional] object

default: {}

#### descriptions:
set default global vars if not exist in css source

usage:

```javascript
vars2value({
  defaultVars: {
    "tw-empty": "none",
  },
});
```

## Test

```shell
yarn run test
```

## License

This project is licensed under the MIT License.
