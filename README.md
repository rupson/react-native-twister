# Configurable twister app (possibly)

fucking about with react native.

## Local development

### Dependencies

To run the application in your local environment you will need the following:

-   [NodeJS](https://nodejs.org/en/download/package-manager/). Recommended to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) or similar to manage ndoe versions.
-   expo cli [install here](https://docs.expo.io/workflow/expo-cli/).
-   a node package manager (please use yarn if you want to contribute to avoid conflicting lockfiles. Otherwise yarn or npm are both fine) [get yarn](https://classic.yarnpkg.com/en/docs/install).
-   clone the repo and run `yarn install` the project root.

### Running

To run the project run `yarn start` from the root directory.

To run on your android device connected to the PC, ensure that USB debugging is enabled for the device and run

```bash
yarn android
```

from the root directory. This will run the project in development mode on your phone, with hot reloading for your changes.

## Contributing

-   Take a look at our project kanban board.
-   Pick an issue you would like to pick up, drag it from 'to do' column into 'in progress'. This should assign that issue to your user and also makes it visible for other contributors so we don't have 2 people working on the same thing
-   Make a branch off of `master`, write your code, then make a PR to merge your branch into master. Make sure you link your PR to the issue from the kanban board, and the board can automatically track progress of the issue without you having to move it across lanes manually anymore.
-   Once your PR has received an approving review, merge the PR into the main branch, et voila
-   The kanban board should update automatically and move the issue into 'done' column.
