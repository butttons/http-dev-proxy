#!/usr/bin/env node

const express = require('express');
const argv = require('yargs-parser')(process.argv.slice(2));
const { existsSync } = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { resolve } = require('path');

const configFile = argv.config || 'proxy.config.js';
const fullConfigPath = resolve(process.cwd(), configFile);

if (!existsSync(fullConfigPath)) {
    console.warn(`File not found at ${fullConfigPath}`);
    return;
}

const proxyConfig = require(fullConfigPath);
const port = +argv.port || 3333;
const app = express();

proxyConfig.forEach((item) => {
    app.use(
        item.path,
        createProxyMiddleware({
            target: item.proxyTo,
            logLevel: 'silent',
            changeOrigin: true,
            pathRewrite: { [`^${item.path}`]: '' },
            onProxyRes(proxyRes) {
                proxyRes.headers['access-control-allow-origin'] = '*';
            },
        }),
    );
    console.log(
        `[PROXY] http://localhost:${port}${item.path} -> ${item.proxyTo}`,
    );
});

app.listen(port);
