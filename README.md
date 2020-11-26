# Simple HTTP proxy for development

## Installation:

```
npm i -g http-dev-proxy
```

## Usage:

-   Create a `proxy.config.js` file. You can use `proxy.config.js.example` as a template.
-   Configure your objects with the following details.

```js
{
    path: 'The path on the local server to listen on',
    proxyTo: 'The URL of the target'
}
```

-   An example config file:

```js
module.exports = [
    {
        path: '/example',
        proxyTo: 'https://example.com',
    },
];
```

-   Run the utility by using `http-dev-proxy` where the config file is placed.

## Configurable options:

```
--port      # Specify the port the proxy server should run on. Defaults to port 3333
--config    # Config file to be used. Defaults to proxy.config.js
```
