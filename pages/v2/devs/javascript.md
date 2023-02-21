---
id: javascript
title: Javascript Rules
sidebar_label: Javascript Rules
slug: /devs/javascript
---

#### Prefer pure functions. Avoid side effects.

Pure functions are:

- Reusable
- Reliable
- Easier to debug
- A good way to avoid naming collisions
- More testable

#### Prefer pure array methods over for loops

- Array methods like map and filter return a new array, which helps prevent object mutation
- Helps take the work out setting up the values in a for loop

#### When iterating over objects, use a 'for in' loop or convert to an array

- 'For in' has a cleaner syntax, and will only iterate over the amount of keys in the object
- Whereas a for loop can loop infinitely

#### Ternary operators should be limited to two conditions.

Avoid this

```js
const complicatedControlFlow = condition
  ? otherCondition
    ? "result1"
    : "result2"
  : `Wait, I'm confused. What is this one for?`;
```

While the above example is more compact and declarative, it's pretty tough to understand.

It's much better to call a separate function and use if/else blocks.

Use this instead:

```js
const handleFlow = (condition, otherCondition) => {
  if (condition && otherCondition) {
    return "result1";
  } else if (condition && !otherCondition) {
    return "result2";
  } else {
    return "I get it now";
  }
};

const complicatedControlFlow = handleFlow(condition, otherCondition);
```

For many, the above example is easier to disect. Moving to an if/else code block allows us to flatten the logic and make it more readable.

#### Prefer constants and multiple returns over reassigning variables.

Avoid this:

```js
let val;
if (thing) {
  val = 2;
} else if (somethingElse) {
  val = 5;
} else {
  val = 7;
}
return val;
```

Instead, use this:

```js
if (thing) {
  return 2;
} else if (somethingElse) {
  return 5;
} else {
  return 7;
}
```

#### Prefer currying, closure, and higher order functions over classes and big objects.

Classes are great for organizing state with its corresponding logic. Unfortunately, we're also holding state in React Components. This can create a lot of bugs that are difficult to track later on.

Functional programming practices help us eliminate state wherever possible. While cumbersome initially, this approach saves time in the long run.

#### Return null instead of undefined.

Undefined is often set by the JS engine to describe variables that are undeclared or functions that haven't returned anything.

Using null lets devs know that this value was set deliberately, and sets them up for faster debugging.
