---
id: react-jsx
title: JSX
sidebar_label: React/JSX
slug: /devs/react-jsx
---

#### Minimum Viable JSX

JSX should only be responsible for UI rendering and some rendering logic. Higher order logic should be performed outside of the return statement, or better yet, outside of the component (if possible).

- Eliminate as much as logic as possible from JSX
- Eliminate as much style as possible from JSX.

#### Minimize Anonymous callback functions inside of props

Anonymous functions inside JSX need to be saved to a different part of memory on every render, which will bog down the build over time.

There are instances where using anonymous functions are the only option, but in any other case, refactor to a named const inside the component body.

Avoid:

```js
return (
  <div>
    <button onClick={() => doSomething("yup")} />
  </div>
);
```

Use

```js
const handleClick = (e) => {
  if (e?.target?.value) {
    doSomething(e.target.value);
  }
};

return (
  <div>
    <button onClick={handleClick} value="yup" />
  </div>
);
```

*Note: this solution works when the expected value is a string. Other data types cannot be stored on dom elements. However, in most cases, the data we are referencing is a value inside the component (ex. state).*

Create a new function every time, and it will eventually bog down a computer's memory. Unless completely necessary, save a function to a constant inside the component (ex. handleClick) and pass it to props as a callback.

#### Prefer unary operators where applicable

Generally use

```js
exists && <Component />;
```

Instead of

```js
exists ? <Component /> : null;
```

However in JSX, there's a strange effect that happens when testing for 0 as falsy value.

```js
const array = [];

array.length && <Component />;

//  inserts a '0' in UI.
```

This is because 0 is a falsy value, but the JSX parsing engine will still interpret this 0 as a value, whereas other falsy values (null, undefined, false, '0') do not render anything.

So in this case, use:

```js
const array = [];

array.length > 0 && <Component />;

//  inserts a '0' in UI.
```
