---
id: contexts
title: Application Contexts
sidebar_label: Contexts
slug: /devs/contexts
---

## Overview

## Custom Theme Context

```js
import useCustomTheme from '../contexts/CustomThemeContext';
...
const { theme, updateTheme } = useCustomTheme();
```

CustomThemeContext is a high level context responsible for switching custom Chakra styles and toggling prebuilt overlay components. Both ChakraContext and OverlayContext are nested inside of CustomThemeContext.

**Main Functions**:

- `theme` - Chakra theme context extended with the default and/or custom theme
- `updateTheme` - Updates a dao's theme (colors, font, terms). At present, this is called from DaoMetaData context.
- `tempTheme` - Temporary theme data to help the user preview theme changes before setting custom theme.
- `updateTempTheme` - Updates temporary tempTheme.
- `resetTheme` - Resets theme data to default. This is called in Hub view or when a Dao doesn't have custom theme data.

## DAO Context

```js
import useDao from '../contexts/DaoContext';
...
const { daoOverview, daoProposals } = useDao();
```

Nested inside of the DaoPage, the DaoContext is a high-order context that houses MetaDataContext, TokenContext, DaoMemberContext, and TXContext. DaoContext is responsible for a large call to the subgraphs where it retrieves current information about proposals, activities, members, and overview -- each in relation to the dao and chain data found in the URL (daochain and daoid from useParams).

All contract transactions that are made on the DAO being viewed will usually call refetch() once the TX poll has passed. This will fetch all DAO data again to ensure the DAO's data is up to date. It is **important** to note that each fetch made in DAOContext, and the contexts nested inside, use a useRef() to prevent unnecessary fetches. These will need to be reset explicitly (TXContext does this for us).

- `daoProposals` - Array of DAO proposals.
- `daoActivities` - Array of DAO activities from proposals history.
- `daoMembers` - Array of Members.
- `daoOverview` - DAO stats seen on the overview page.
- `isCorrectNetwork` - Boolean that tells us if a user's provider is the same as the DAO's network.
- `refetch` - function to trigger refetching DAO data. Usually called from TXContext.
- `hasPerformedBatchQuery` - DOM reference (useRef) that records if the client has queried the Graph.

## DAO Member Context

```js
import useDaoMember from '../contexts/DaoMemberContext';
...
const { theme, updateTheme } = useDaoMember();
```

DAOMemberContext is responsible for a user's data in relation to the current dao they are viewing. This holds their membership data (if they are a member) and their wallet info. The context checks DaoMembers from DaoContext for the user's address. If that address exists in the list of members, it is saved as **daoMember**. Then, if daoMember is _True_, we fetch wallet information and input it into daoMember state.

- `currentMemberRef` - Stops unnecessary renders.
- `isMember` - Boolean to tell us if the user's address is a member of the DAO being viewed.
- `daoMember` - Object that holds membership data about the user in relation to the DAO they are viewing. If they are not a member then daoMember is null.
- `memberWalletRef` - prevents extra contract calls for wallet data.

## Explore Context

```js
import React, { useContext } from 'react';
import ExploreContext from '../contexts/ExploreContext';
...
const { exploreDaos } = useContext(ExploreContext);
```

Much like UserContext, ExploreContext fires off a large batch of queries (exploreChainQuery) to the subgraph and the DAOhaus API. For each supported chain, explore context finds all DAOs that are listed with DAOhaus and links it up with the corresponding data found on the API. A side effect pattern is used to set React's state as each chain's DAO resolves its data.

- `exploreDaos` - Array of networks. Each network holds all the DAOs that can be found on that network.
- `hasLoadedExploreData` - A ref to stop any excess fetches.

## Injected Provider Context

```js
import useInjectedProvider from '../contexts/InjectedProviderContext';
...
const { address, injectedChain } = useInjectedProvider();
```

InjectedProviderContext is a highlevel context that holds a user's web3 provider. It also instantiates EIP-1193 listeners for 'accountsChanged' and 'chainChanged'. Whenever the user requests web3 sign in, or changes their account or network, the context requests the provider from Web3Modal and saves it in state.

It is important to note that this provider isn't used for just injectedProviders. It will also handle WalletConnect, Portis, and Fortmatic providers as well. A default provider for viewing contract data isn't necessary as this app gets most of its data from The Graph.

- `injectedProvider` - provider object from Web3Modal nested within a web3.js provider object.
- `requestWallet` - Requests wallet provider from Web3Modal
- `disconnectDapp`- Sets injectedProvider to null and Web3Modal back to defaults. Also clears W3M's cache.
- `injectedChain`- A sub-object form from chain.js for the current network or chain the provider is on.
- `web3Modal` - Object for initializing Web3Modal, a library that gathers various wallet providers from the user.
- `address` - User's current address.

## MetaData Context

```js
import useMetaData from '../contexts/MetaDataContext';
...
const { daoMetaData, customTerms } = useMetaData();
```

MetaData Context fetches a DAO's metadata from the DAOhaus API. This is where we'd find information about boosts and customTheme as well as custom terminology used by each DAO.

This data is also fetched in the initial UserContext's bigGraphQuery(). We use redundant queries to accelerate loading times across Hub and DAO pages, while also retrieving metadata for DAOs that the user is not a member of. **daoMetaData** is set by whatever query resolves first.

- `daoMetaData`- Object that contains a DAOs metadata.
- `hasFetchedMetadata`- Ref to prevent unnecessary fetches and race conditions.
- `shouldUpdateTheme` - Ref to prevent rerendering ChakraContext
- `customTerms` - Object containing custom terminology
- `refetchMetaData`- A refetch that gets metadata from MetadataContext and UserContext

## Overlay Context

```js
import useOverlay from '../contexts/OverlayContext';
...
const { daoSwitcherModal, successToast } = useOverlay();
```

A context resposible for toggling prebuilt modals and toasts. This context is nested in CustomThemeContext.

- `daoSwitcherModal`
- `setDaoSwitcherModal`
- `daoAccountModal`
- `setDaoAccountModal`
- `hubAccountModal`
- `setHubAccountModal`
- `proposalModal`
- `setProposalModal`
- `errorToast`
- `successToast`
- `warningToast`
- `txInfoModal`
- `setTxInfoModal`
- `imageUploadModal`
- `setImageUploadModal`
- `genericModal`
- `setGenericModal`

## Token Context

```js
import useToken from '../contexts/TokenContext';
...
const { currentDaoTokens } = useToken();
```

Token Context fetches USD values, symbols, links to logos, and contract values for each white-listed token in a DAO. To optimize loading speeds, it fetches for token API data(logos, symbols, USD) first, then it calls for contract values (Dao Babe balance vs. token contract balance).

- `currentDaoTokens` - All token data in relation to the current DAO.
- `shouldFetchInit` - A ref to prevent extra API calls
- `shouldFetchContract`- A ref to prevent extra contract calls.

## TX Context

```js
import useTX from '../contexts/TXContext';
...
const { refreshDao } = useTX();
```

TX Context sits below the other DAO specific contracts so that it has access to each parent Context. It explicitly resets each parent context's useRefs, then calls a refetch in DAOContext. This allows the DAO view to completely refresh and update.

- `refreshDao` - Resets each DAO context ref. Refreshes DAO data after a tx

## User Context

```js
import useUser from '../contexts/UserContext';
...
const { userHubDaos, outstandingTXs } = useUser();
```

User Context is responsible for all data in relation to the user's given address. On page load, it calls a subgraph for each chain that DAOhaus supports. Inside that network is all the DAO data that pertains to the user's address. It then fetches the API for metadata and combines it with the graph data. Using a side-effect pattern, the query sets React as each chain's query resolves to paint elements onto the screen faster.

User Context is also responsible for transactions and polls that the user has cached in LocalStorage. If there are outstanding transactions that are unresolved, it recalls the poll to check if that TX has been processed. It also holds in state a user's previous resolved transactions.

- `userHubDaos`- Array of networks, each containing all DAOs that the user is a member of.
- `hasLoadedHubData` - A ref to prevent extra fetches.
- `cachePoll` - A utility function that caches Poll data inside a poll service so that it can be called later on.
- `resolvePoll` - A function that sets a user's TX to 'resolved'. This stops the TX from automatically polling on page load.
- `outstandingTXs` - An array of the user's past TXs, both resolved and unresolved.
- `refetchUserHubDaos` - Refetch function.
