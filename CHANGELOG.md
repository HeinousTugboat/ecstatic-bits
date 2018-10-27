# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.0"></a>
# [3.0.0](https://github.com/HeinousTugboat/ecstatic-bits/compare/v2.0.1...v3.0.0) (2018-10-27)


### Bug Fixes

* removes strictPropInit and formats tsconfig ([291a0e2](https://github.com/HeinousTugboat/ecstatic-bits/commit/291a0e2))


### Features

* overhauls components, systems, and entities with new strategy ([2b31c22](https://github.com/HeinousTugboat/ecstatic-bits/commit/2b31c22))
* rewrites majority of code using new style for Systems ([6e08194](https://github.com/HeinousTugboat/ecstatic-bits/commit/6e08194))


### BREAKING CHANGES

* Major reworking of how components and systems are built



<a name="2.0.1"></a>
## [2.0.1](https://github.com/HeinousTugboat/ecstatic-bits/compare/v2.0.0...v2.0.1) (2018-04-05)



<a name="2.0.0"></a>
# 2.0.0 (2018-04-05)


### Bug Fixes

* appeases the tsc overlords ([26b64c5](https://github.com/HeinousTugboat/ecstatic-bits/commit/26b64c5))
* corrects typo, closes [#1](https://github.com/HeinousTugboat/ecstatic-bits/issues/1) ([959ac15](https://github.com/HeinousTugboat/ecstatic-bits/commit/959ac15))


### Features

* **component:** moved to Maps and Sets ([daf22b8](https://github.com/HeinousTugboat/ecstatic-bits/commit/daf22b8))
* heavily overhauls component functions, removes Builder method ([5d5638e](https://github.com/HeinousTugboat/ecstatic-bits/commit/5d5638e))
* **components:** moved to abstract classes+decorators ([0e9266a](https://github.com/HeinousTugboat/ecstatic-bits/commit/0e9266a))
* intial interface prototyping ([4321d25](https://github.com/HeinousTugboat/ecstatic-bits/commit/4321d25))
* switched files over to classes where possible ([f231c79](https://github.com/HeinousTugboat/ecstatic-bits/commit/f231c79))
* **components:** wrestling with getting components to work right ([ea9c75b](https://github.com/HeinousTugboat/ecstatic-bits/commit/ea9c75b))
* updates Entity.get signatures ([2d01972](https://github.com/HeinousTugboat/ecstatic-bits/commit/2d01972))
* **component:** add some base component tests and coverage ([a008e91](https://github.com/HeinousTugboat/ecstatic-bits/commit/a008e91))
* **component:** adds temporary copy of component file from SO for reference ([1c6891a](https://github.com/HeinousTugboat/ecstatic-bits/commit/1c6891a))
* **component:** tests and class rounded out ([08dd16f](https://github.com/HeinousTugboat/ecstatic-bits/commit/08dd16f))
* **ecstatic-bits:** adding default export ([d7aace1](https://github.com/HeinousTugboat/ecstatic-bits/commit/d7aace1))
* **entity:** add some base entity tests and coverage ([7265978](https://github.com/HeinousTugboat/ecstatic-bits/commit/7265978))
* **entity:** added ECS reset to tests, cleaned up class ([9d99e96](https://github.com/HeinousTugboat/ecstatic-bits/commit/9d99e96))
* **entity:** progress on Entity ([6d6fb5c](https://github.com/HeinousTugboat/ecstatic-bits/commit/6d6fb5c))
* **system:** implemented majority of system class + tests ([b716b3b](https://github.com/HeinousTugboat/ecstatic-bits/commit/b716b3b))


### BREAKING CHANGES

* @ComponentType decorator renamed to @RegisterComponent, components now
added/removed by class name instead of string label
