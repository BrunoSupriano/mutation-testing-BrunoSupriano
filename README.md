# Mutation Testing com Jest e Stryker

## GitHub Actions

[![Build and Tests](https://github.com/BrunoSupriano/mutation-testing-BrunoSupriano/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/BrunoSupriano/mutation-testing-BrunoSupriano/actions/workflows/node.js.yml)

## SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BrunoSupriano_mutation-testing-BrunoSupriano&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BrunoSupriano_mutation-testing-BrunoSupriano)

## Getting Started

In order to execute this project you must follow the steps below:

1. Install [Node JS](https://nodejs.org/) (version >= 20.x)
1. Run `npm install` to install all the project dependencies
1. Run `npm run test` to execute the entire test suite
1. Run `npm run coverage` to execute the entire test suite with coverage
1. Run `npm run mutation` to execute the mutation tests with Stryker

All execution artifacts can be found in `./coverage`, if you want to remove these files run `npm run clean`.

## Project Structure
</br>
<ul>
    <li>src: source code</li>
    <li>test: unit test files</li>
</ul>
