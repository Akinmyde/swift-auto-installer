#!/usr/bin/env node

const chokidar = require('chokidar');
const chalk = require('chalk');
const { checkPackages, copyPackages } = require('./index');

const start = async () => {
    await copyPackages();
    console.log(chalk.green("watching......"));
    await checkPackages(true);

    let watcher = chokidar.watch('package.json');
    watcher.on('change', async () => {
        await checkPackages(true);
    });
}

start();
