# Simple HTTP proxy for development

## Usage:

-   Create a `proxy.config.js` file. You can use `proxy.config.js.example` as a template.
-   Configure your object with the following details.

```js
{
    path: 'The path on the local server to listen on',
    proxyTo: 'The URL of the target'
}
```
