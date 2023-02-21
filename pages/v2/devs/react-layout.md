---
id: react-layout
title: Imports and Component Layout
sidebar_label: Component Layout
slug: /devs/react-layount
---

### The Shape of a React Component

```
- imports
- Single use utilities [should refactor]
- CSS [We have Chakra, limit use]
- Component body
- Possible stateless subcomponent
- Export statement
```

### Imports

```
- React imports
- Third party package imports
(space)
- react contexts
- react components (includes pages)
- js services
- js utilities
(space)
- React.lazy dynamic imports
```

Example:

```js
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route, useParams } from "react-router-dom";

import { useDao } from "../contexts/DaoContext";
import Dao from "../pages/Dao";
import Layout from "../components/layout";
import Modal from "../components/modal";
import { MolochService } from "../services/MolochService";
import { convertTimeUnits } from "../utils/Time";

const HeavySubPage = lazy(() => import("../pages/HeavySubPage"));
```

### Component Body

```
- Function declaration w/ props
- destructure contexts
- destructure props
(space)
- useState
- useRef
- simple expressions
(space)
- useEffect/useMemo
(space)
- Functions/useCallback
(space)
- Return statement (JSX)
```

Example:

```js
/// FUNCTION DECLARATION
const Component = ({ bigProps }) => {
  //  DEPENDENCY DECLARATIONS
  const { address, injectedProvider } = useInjectedProvider();
  const { errorToast } = useOverlayContext();
  //  Don't have to destructure props, just an example of placement
  const { smallProp, anotherSmallProps } = bigProps;

  /// STATE DECLARATIONS
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const isTrue = smallProp ? "yes" : "no";

  //  SIDE EFFECTS
  useEffect(() => {
    const painInTheAssAsyncFn = async (address) => {
      setLoading(true);
      try {
        const sumthin = await fetchSumthin(address);
        setState(sumthin);
      } catch (error) {
        console.error(error);
        errorToast({
          title: "Didn't Work",
          description: "It didn't work, ok?",
        });
        setState(null);
      } finally {
        setLoading(false);
      }
    };
    if (!state && address) {
      painInTheAssAsyncFn(address);
    }
  }, [state, address]);
};

//  FUNCTIONS
const handleClick = () => {
  setState(false);
};

//  OUTPUT
return (
  <div>
    <h1>Hey!</h1>
    <button onClick={handleClick}>Click this!</button>
  </div>
);
```
