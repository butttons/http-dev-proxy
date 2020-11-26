#!/usr/bin/env node

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyConfig = require('./proxy.config');
const port = +process.env.PORT || 3333;
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
