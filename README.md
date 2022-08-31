# tnest-cli - The CLI tool support for nestjs

## Description

Nest CLI is a command-line interface tool that helps you create, develop, and maintain your Nest applications. It supports creating an API instance by the name you want to give it. It can create 2 types: decompose by function or merge them into one component.

CLI supports generating mongoose schema files and automatically importing them into related files

If you want to create your own file, use [@nestjs/cli](https://docs.nestjs.com/cli/overview).

I hope this tool can reduce the file creation process for you.

Thank you for your interest in this tool

## Installation

```
$ npm install -g tnest-cli
```

## Quick start

```
$ tnest g product src/apis
```

```
$ tnest g -h
Usage: tnest g [options] <name> [path_folder]

CLi generates schema, controller, and service files according to the name you enter

Arguments:
  name          file name
  path_folder   path folder if null is src/. For example: src/apis or apis

Options:
  -g, --genera  genera a folder
  -h, --help    display help for command
```

## Options

Default if -g (--genera) flag is not used results after the run is:

```
$ tnest g product src/apis
```

```
src
│
└── apis
    ├── controllers
    │   └── product.controller.ts (CREATE)
    ├── schemas
    │   └── product.schema.ts (CREATE)
    ├── service
    │    └── product.service.ts (CREATE)
    └── apis.module.ts (UPDATE)
```

when using flags -g:

```
$ tnest g product src/apis -g
```

```
src
│
└── apis
    ├── product
    │   ├── product.controller.ts (CREATE)
    │   ├── product.schema.ts (CREATE)
    │   ├── product.service.ts (CREATE)
    │   └── product.module.ts (CREATE)
    └── apis.module.ts (UPDATE)
```

These are the command line flags included in the tool:

```
-g, --genera      genera a folder
-o, --overwrite   overwrite existing files
```
