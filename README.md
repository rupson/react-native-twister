# Configurable twister app (possibly)

fucking about with react native.

## Local development

### Dependencies

To run the application in your local environment you will need the following:

-   [NodeJS](https://nodejs.org/en/download/package-manager/). Recommended to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) or similar to manage ndoe versions.
-   expo cli [install here](https://docs.expo.io/workflow/expo-cli/).
-   a node package manager (please use yarn if you want to contribute to avoid conflicting lockfiles. Otherwise yarn or npm are both fine) [get yarn](https://classic.yarnpkg.com/en/docs/install).
-   clone the repo and run `yarn install` within the `/twister` directory.

### Running

To run the project run `yarn start` from the `/twister` directory.

To run on your android device connected to the PC, ensure that USB debugging is enabled for the device and run

```bash
yarn android
```

from the `/twister` directory. This will run the project in development mode on your phone, with hot reloading for your changes.
