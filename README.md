[![Node version](https://img.shields.io/node/v/react.svg?style=flat)](http://nodejs.org/download/)

# performance-manager-ui: The coding challenge

>The UI project for performane manager app, another component apart from service.

UI is built with latest front end technlogies.

- [About challenge](https://github.com/Pay-Baymax/FullStackEngineerChallenge)
- [Service/API & docs](https://github.com/jaydeep987/performance-manager-service)
- [Features & Technology stack](#features)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
  - [Running](#running)
  - [Tests](#tests)
  - [Linting and build](#linting-and-build)
- [Next Step](#next-steps)
- [UI Design](./docs/ui-design.md)
- [Assumptions](./docs/assumptions.md)
- [Limitations and scope of improvements](#limitations)
- [My way of thinking](https://github.com/jaydeep987/performance-manager-service/blob/master/docs/myway.md)

## Features
  - Using `Babel7` and `typescript` to use latest `ecma` features
  - `react v16.8.3` included
  - Supports `code-splitting` or `lazy-loading components` by using `React.lazy` and `React.Suspense`
  - Configured with `mobx`, no more bunch of code writing in redux or something
  - Configured `react-router` for routing support
  - *Themed* with beautiful new `material-ui v4`!
  - Included rich [*icon* library](https://materialdesignicons.com/)
  - `Webpack` configuration ready for *production*
  - *i18n* setup
  - *Testing* with `jest` *(this can be improved for snapshot testing)*

## Getting started

### Prerequisites
- node v10.13.0
- npm v6.4.1
- Mac or Ubuntu like linux

__Notes:__
- Need exact node version specified above
- Tested only in **Mac** mainly. In Ubuntu 18.04 roughly. **No guarantee about windows and other machines**

### Steps

*Clone* [this repo](https://github.com/jaydeep987/performance-manager-ui.git)

  - `cd performance-manager-ui`
  - `npm install`
  - *Start dev server:* `npm start`

That's it!

If you ran *docker* to up the *service* (API), then user admin is automatically added in database.
Go ahead run the app and login with **admin**:**123**

### Running

- Open `http://localhost:8080`
- Don't use `0.0.0.0` this host is not allowed at API side!

### Tests

Though tests are not yet written for all components, but I tried to write for basic utils and some components like *home*, *login* etc.

So most probably they should pass. But I did not get much time to test that test frameworks properly!
  - *Run tests:* `npm test`

### Linting and build
  - *Lint and type check:* `npm run lint`
  - *Build:* `npm run build` (this will lint before build!)

## Next step
Next step should be to configure [service](https://github.com/jaydeep987/performance-manager-service) if you have not done yet. If done already, start playing with app!

## Limitations
As with everything in the world, there are always some limitations and chance of improvements, and so with this app too!

- Localization can be managed better, starting from login page. Also may be store in cookie and manage server side to persist.
- Password need to encrypt. Not done yet.
- Pagination is not implemented server side yet.
- Localized error message from server, as said earlier.
- For simplicity and lack of time, not used transactions in server side, because mongodb needs replica set for that and extra installation steps.
- Resetting all mobx store after logout can be improved.