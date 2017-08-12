# count-git-tags

A tool to count the number of tags of a git repository

[![Build Status](https://travis-ci.org/aichbauer/node-count-git-tags.svg?branch=master)](https://travis-ci.org/aichbauer/node-count-git-tags)
[![Build status](https://ci.appveyor.com/api/projects/status/wr6v4elj6xa7grno?svg=true)](https://ci.appveyor.com/project/aichbauer/node-count-git-tags)
[![Coverage Status](https://coveralls.io/repos/github/aichbauer/node-count-git-tags/badge.svg?branch=master)](https://coveralls.io/github/aichbauer/node-count-git-tags?branch=master)

## Installation

```sh
$ npm i count-git-tags --save
```
or
```sh
$ yarn add count-git-tags
```

## Usage

```js
const countGitTags = require('count-git-tags');

countGitTags(); // the number of tags of a repo of process.cwd()

countGitTags({ path: 'path/to/repo' }); // the number of tags of a repo in `path/to/repo`

countGitTags({ path: 'path/to/repo', local: false }); // the number of tags of a repo in `path/to/repo`, from the remote repository
```

## LICENSE

MIT © Lukas Aichbauer
