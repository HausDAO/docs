---
id: react-use-effect
title: Use Effect
sidebar_label: React/useEffect
slug: /devs/react-use-effect
---

useEffect is a big enough pain in the hip to justify its own page. While powerful and extremely useful, there are common conventions that devs should follow in order to prevent it from causing strange, strange bugs.

#### Include all dependencies in the dependency array

**Linter:** Our linter currently doesn't lint for dep-array inclusion. There's a lot of legacy code that hasn't been updated to properly follow this pattern, so turning it on and updating all components at once would come at too high of a cost to the progress of the app. Our plan is to fix this gradually.

In the interim, devs are resposible for ensuring that every changing value referenced inside the useEffect is also referenced in the dependency array.

#### Rules for calling functions inside the useEffect

This applies to functions inside of the React Component. Functions outside of a react component (ex. a JS utility function) don't rely on state or props, and therefore do not need to be included in the dep array.

- If possible, try to include that function inside of the useEffect itself
- If that gets too messy (code duplication), then see if the function can be refactored into a pure function and move outside of the component.
- If it relies too heavily on state, then its time brings out useCallback as a last resort. useCallback also has a dep array. Be sure to include all dependencies in that array.

Read more about this in the <a href='https://reactjs.org/devs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies'>React Docs </a>

#### Monitor your useEffect.

Check to see how often logic or async calls are running inside the useEffect. Optimize by escaping only refactoring computationally expensive operations to a function and only running that function when necessary.

#### When to useEffect vs. useMemo vs. lazy-initialization

As a general rule of thumb

- useEffect is great for fetches and awaiting asynchronous data
- useMemo is good for calculating and updating expensive synchronous operations and saving it to a constant

```js
const value = useMemo(() => {
  // only when incoming value changes
  // or after first render
  // update value
  return expensiveOperation(incomingValue);
}, [incomingValue]);
```

- lazy-initialization is a great pattern for initializing state once without holding up rendering of the component

```js
//  this waits for the component to render, computes, then sets state
const [value, setValue] = useState(() => {
  expensiveOperation(incomingValue);
});
```

#### When to use the useRef/useEffect pattern

Read more about this in Common Utilities and Patterns section

#### Always unsubscribe from listeners
