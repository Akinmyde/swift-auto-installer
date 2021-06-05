const chokidar = require('chokidar');
const chalk = require('chalk');
const { checkPackages, copyPackages } = require('./helper');

const runner = async () => {
    await copyPackages();
    console.log(chalk.green("watching......"));
    await checkPackages(true);

    let watcher = chokidar.watch('package.json');
    watcher.on('change', async () => {
        await checkPackages(true);
    });
}

module.exports = runner;