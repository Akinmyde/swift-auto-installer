#!/usr/bin/env node
require('./runner')();

// const chokidar = require('chokidar');
// const chalk = require('chalk');
// const { checkPackages, copyPackages } = require('./helper');

// const start =  async () => {
//     await copyPackages();
//     console.log(chalk.green("watching......"));
//     await checkPackages(false);

//     let watcher = chokidar.watch('package.json');
//     watcher.on('change', async () => {
//         await checkPackages(false);
//     });
// }

// start();   
