---
id: react-components
title: React Components
sidebar_label: React/Components
slug: /devs/react-components
---

import useBaseUrl from "@docusaurus/useBaseUrl";

#### Keep 'em simple

It should be easy to understand the rendering logic of a React Component. Can someone understand your Component after five minutes of reading it? If not, then it needs to be refactored.

Page components, routers, and contexts are naturally larger, as they generally hold the majority of the complicated application logic

Goal: We should try to cap component length between 200-300 lines.

#### Refactor complex logic to utilities.

#### Stateful components should have their own file

- Non stateful components can be in the same file if they are used exclusively by their parent component

#### Always use a unique key when mapping components (not index).

#### Use Functional Updates to set self-referential state

When setting state based on a previous value, use functional updates to ensure values that are up to date.

Avoid:

```js
const [state, setState] = useState(4);

const increment = () => {
  setState(state + 1);
};
```

Use:

```js
const [state, setState] = useState(4);

const increment = () => {
  setState((prevState) => prevState + 1);
};
```

Doing so ensures that the state is never stale and always updates based on the previous value.

Read more about functional updates in the <a href='https://reactjs.org/devs/hooks-reference.html#functional-updates'> React Docs </a>
