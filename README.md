# sumory

A simple game to teach explore vs exploit strategies in AI.

## Configuration

The `config.json` file supports the following properties:

- **Languages**: Object where keys are 2-letter iso language codes and values are
  language names. This is used to build the language switch menu. Each language
  must have a corresponding translation file in the `tr` directory.
- **defaultLanguage**: The application will start with this language by default.

## Query string arguments

- **lang**: Use a 2-letter iso language code to override the default language.

## Compilation

This app is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files. 

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **yarn**
- **gulp** (install globally)

Afterwards run the following in the command line:

```
cd src
yarn
```

After it runs succesfuly you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```
  
- **scripts (ES6)**
    ```
    gulp scripts
    ```

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    yarn run build
    ```
  
## Credits

Original concept by Aaron Montag and Andreas Daniel Matt.
Developed by Eric Londaits for IMAGINARY gGmbH.

## License

Copyright (c) 2020 IMAGINARY gGmbH
Licensed under the MIT License (see LICENSE)
