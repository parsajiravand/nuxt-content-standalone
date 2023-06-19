# Nuxt Content Standalone

[![npm version](https://badge.fury.io/js/nuxt-content-standalone.svg)](https://badge.fury.io/js/nuxt-content-stand)

> Setup documentation in your app with a sidebar feature, table of contents, and more, <b>without</b> setting `documentDriven` to `true` for Nuxt Content.

## Description

"Nuxt Content Standalone" is a package that allows you to easily integrate a documentation system into your Nuxt.js application. It provides a sidebar feature, table of contents, and various customization options. The package works with Nuxt Content, even if the `documentDriven` option is <b> not </b> set to `true`.

## Features

- Sidebar navigation
- Table of contents generation
- Customizable styles and appearance
- Support for nested sections and pages
- Automatic highlighting of the active section/page
- Integration with Nuxt Content without `documentDriven` mode

## Installation

You can install the package via npm:

```shell
npm install nuxt-content-stand
```

or using Yarn:

```shell
yarn add nuxt-content-stand
```

## Usage

- To use "Nuxt Content Standalone" in your Nuxt.js application, follow these steps:

- Install the package as mentioned in the installation section.

- Import and register the plugin in your Nuxt configuration file (nuxt.config.ts):

```ts
export default defineNuxtConfig({
  extends: "nuxt-content-stand",
});
```

- Create your documentation content in the content directory of your Nuxt.js project. Follow the guidelines and conventions provided by Nuxt Content.

- Configure your documentation routes and structure as needed using the nuxt-content-standalone plugin options.

- Use the NuxtContentStandalone component in your Vue templates to render the documentation sidebar and content.

- For more detailed instructions and examples, please refer to the documentation of Nuxt Content Standalone.

## Documentation

The complete documentation for "Nuxt Content Standalone" can be found at https://github.com/parsajiravand/nuxt-content-standalone.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request on the GitHub repository.

## License

This package is open source and available under the MIT License.
