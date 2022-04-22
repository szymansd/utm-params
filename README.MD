# UTM params saver

![npm](https://img.shields.io/npm/v/utm-params-saver) ![npm bundle size](https://img.shields.io/bundlephobia/min/utm-params-saver)

**Since 1.4.0 IE 11 is not supported**

This is a library that allows you to save UTM params of website visitor to local storage.

## Installation

Just simply run:

```
yarn add utm-params-saver
```

or

```
yarn add utm-params-saver
```

## Parameters that will be tracked

- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_name
- utm_term
- initial_utm_source
- initial_utm_medium
- initial_utm_campaign
- initial_utm_content
- initial_utm_name
- initial_utm_term

## Usage

Simple use case how to use this library

```
import UTM from 'utm-params-saver';

UTM.parse(); // this will return all params based on location

UTM.save(UTM.parse()); // this will save all params to localStorage

UTM.get() // this will return all params from localStorage
...
```

## Running the tests

Just simply run
```
yarn test
```

## Author

* **Dominik Szymanski** - https://github.com/szymansd
