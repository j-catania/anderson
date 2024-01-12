# eMusk
_He is just a modulary guy for checking service health_

[![Node.js Package](https://github.com/j-catania/emusk/actions/workflows/build-release.yml/badge.svg)](https://github.com/j-catania/emusk/actions/workflows/build-release.yml)
[![NPM Version](https://img.shields.io/npm/v/emusk.svg)](https://npmjs.org/package/emusk)
[![NPM Downloads](https://img.shields.io/npm/dm/emusk.svg)](https://npmjs.org/package/emusk)
[![Docker Image Version (latest semver)](https://img.shields.io/docker/v/juuu/emusk?logo=docker)](https://hub.docker.com/r/juuu/emusk)
[![Docker Image Size (tag)](https://img.shields.io/docker/image-size/juuu/emusk/latest?logo=docker)](https://hub.docker.com/r/juuu/emusk)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest)](https://github.com/jestjs/jest)
![Coverage badge](./coverage-badge.svg)

## Usage
```shell
Usage: emusk [options]

He is just a modulary guy for checking service health

Options:
  -v, --version                 output the current version
  -f, --config-file <confFile>  Config file (default: "./emusk.json")
  -h, --no-hello                Don't say hello to notifiers
  -V, --verbose                 Active more logs
  -p, --port                    HTTP port (default: 1337)
  --help                        display help for command
```

## Installation
### via NPM
#### With installation
```shell
npm i -g emusk
emusk <option>
```
#### No installation
```sh
npx emusk <option>
```
### via Docker
```
docker run --name emusk -v path/to/my/emusk.json:/config/emusk.json:ro juuu/emusk:latest
```

## Notifiers
### Discord
_... documention is coming soon_

## Checkers
### HTTP


## Configuration file
[JSON Schema](emusk.schema.json) - [Example](emusk.example.json)
```
emusk --config-file=/config/emusk.json <option>
```
