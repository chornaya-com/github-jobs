# GitHub Jobs Project
[![CircleCI](https://circleci.com/gh/chornaya-com/github-jobs/tree/master.svg?style=svg&circle-token=63f6f27e841f7eff22bbd348eaee6daf742f2c66)](https://circleci.com/gh/chornaya-com/github-jobs/tree/master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

GitHub Jobs is a web app for searching jobs based on GitHub Jobs API.
Implemented with React, stylized with react-bootstrap, Firebase and Circle CI integration.

## NOTE: 
Uses external API. To avoid CORS issues use plugin or run browser without web security checks.
```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

[**Live demo**](https://github-jobs-861b5.web.app/)

![Preview](https://user-images.githubusercontent.com/61564546/107790967-4dca2400-6d4b-11eb-9fc4-e35048574081.png)

## Features

- [x] firebase setup
- [x] circle ci setup
- [x] axios for fetching data
- [x] pagination

## How To
### Install Dependencies
```
yarn install
```
### Development
to start development server run:
```
yarn start
```
### Tests
to run unit tests execute:
```
yarn test
```
### Deployment
- create production build:
```
yarn build
```
- deploy to firebase:
```
yarn deploy
```

