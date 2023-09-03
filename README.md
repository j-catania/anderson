# eMusk
_He is just a modulary guy for checking service health_

[![Node.js Package](https://github.com/j-catania/emusk/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/j-catania/emusk/actions/workflows/npm-publish.yml)
[![NPM Version](https://img.shields.io/npm/v/emusk.svg)](https://npmjs.org/package/emusk)
[![NPM Downloads](https://img.shields.io/npm/dm/emusk.svg)](https://npmjs.org/package/emusk)

## Usage
```shell
Usage: emusk [options]

He is just a modulary guy for checking service health

Options:
  -v, --vers                    output the current version
  -f, --config-file <confFile>  Config file (default: "./emusk.json")
  -V, --verbose                 Active more logs
  -h, --help                    display help for command
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
_... coming soon_

## Configuration file
[JSON Schema](emusk.schema.json) - [Example](emusk.example.json)
```
emusk --config-file=/config/emusk.json <option>
```
