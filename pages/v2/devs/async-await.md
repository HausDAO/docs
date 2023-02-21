---
id: async-await
title: Async Rules
sidebar_label: Async Rules
slug: /devs/async-await
---

#### All Async/Await calls need to be wrapped in a try/catch block

Not wrapping a fetch in a try/catch assumes that this call will work 100% of the time, it won't.

#### All promise/.then calls require a .catch

Same as above.

#### Examples:

```js
const goodFetch = async () => {
  try {
    const res = await fetch(API_KEY);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);

    //  How we handle the error differs on the use case.
    //  Sometimes it's better to return or throw the error
  }
};
```
