## Angular Bazel Starter

This repo serves as a template/starter for anyone looking to get up and running with Angular and Bazel. The preview Ivy engine is enabled by default for Angular but can be turned off in `.bazelrc`, with corresponding change to the *postinstall* npm script.

I am aware that Angular has an official [sample repo with bazel](https://github.com/angular/angular-bazel-example). When I tried to build new project on top of the reference repo, I find much of the setup is outdated (`rules_nodejs` and `rules_sass`) or lacks support for an Angular monorepo. Another inspiration to the creation of this repo came from the lack of: while there are a lot of Angular starters out there, most of them use Webpack, not Bazel, let alone the Ivy rending engine. Even though Bazel is still in beta, given its relevance to Google's internal work, I find it beneficial to incorporate it with Angular development even at early stage both for learning and to boost productivity.

### Quick start
**Make sure you have Node version >= 8.0, [Yarn](https://yarnpkg.com), and [Bazel](https://docs.bazel.build/versions/0.27.0/install.html) installed**

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/whichwit/angular-bazel-template.git

# change directory to our repo
cd angular-bazel-template

# start the production server
bazel run //projects/expected:prodserver
```
go to [http://localhost:8080](http://localhost:8080) in your browser

### Features

* Angular Ivy Compiler (ngtsc; opt-in)
* NGXS for state management
* Provides APP_INITIALIZER token for runtime configuration
* Shared package/library
* Build tools with defaults

### Usage

* To build production app, run `ng build` or `bazel build //projects/expected:prodapp`.
* To serve, run `ng serve` or `bazel run //projects/expected:prodserver`.

### Caveats

* Depencency Injection in NGXS State definitions does not work. Since this is not an issue with regular NgModules, it appears the bug is specific to NGXS, likely due to the library not updated for Angular 8 (yet).

### Todo

* Make `:devserver` target funtional
* Add **jest** support for unit test
* Add **cypress** support for e2e test