# Angular/Bazel Starter

## Features

* Angular Ivy Compiler (ngtsc; opt-in)
* NGXS for state management
* Provides APP_INITIALIZER token for runtime configuration
* Shared package/library
* Build tools with defaults

## Usage

* To build production app, run `ng build` or `bazel build //projects/expected:prodapp`. To serve, run `ng serve` or `bazel run //projects/expected:prodserver`
* **todo**: Make functional `:devserver` target