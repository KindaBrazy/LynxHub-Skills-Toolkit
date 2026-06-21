# LynxHub Extension Template

A simple boilerplate repository for building custom LynxHub extensions.

## Development Setup

To develop and test your extension locally:

1. Clone this repository directly into the `/extension` directory at the root of the LynxHub host application:
   ```bash
   git clone https://github.com/KindaBrazy/LynxHub-Extension-Template extension
   ```
2. Run the host application in development mode:
   ```bash
   npm run dev
   ```
   The application will detect the `/extension` folder and load your code.
3. Verify your backend logs in the terminal and inspect your UI additions.
4. Run static validation tests:
   ```bash
   npm run validate:ext
   ```

## Publishing

To publish your extension to the LynxHub plugin registry:

1. Create a dedicated `metadata` branch.
2. Place `metadata.json` and `versioning.json` (samples can be found in `metadata-example/`) in the root of the `metadata` branch.
3. Submit a Pull Request to the global statics registry as detailed in the [Publishing extensions](https://lynxhub.dev/plugins/extensions/publish) documentation.
