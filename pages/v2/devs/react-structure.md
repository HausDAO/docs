---
id: react-structure
title: React Structure
sidebar_label: React/Structure
slug: /devs/react-structure
---

#### Use JS to handle complex logic and state, not JSX.

refactoring to JSX will always make the rendering logic much easier to understand.

#### Components should simplify as they spread out from the app's root.

Components at the bottom of the component heirarchy render much more than the component or contexts at the top. Every time a component re-renders, a function must be redefined.

#### Prefer many small and stateless components to React behemoths

- State is easier to track and debug in smaller components
- Less side effects
- Smaller scope, less naming collisions
- Much, much easier to read and understand.

#### Scope state only to where it needs to be used.

#### useState is meant for separating concerns.

Avoid this:

```js
const [bigState, setBigState] = useState({
  birds: ["Crow", "Sparrow", "Ostrich"],
  likesIceCream: true,
});
```

Use this:

```js
const [birds, setBirds] = useState(["Crow", "Sparrow", "Ostrich"]);
const [likesIceCream, setLikeIceCream] = useState(true);
```

#### Lazy load independent branches of the app (Once updated).

#### Error boundaries should become the norm. (Once updated).

#### Use context when state is required over multiple views or pages. Scope minimally.

#### If initializing useState with a deliberate falsy value, use null instead of undefined.

See related rule in JS rules section
