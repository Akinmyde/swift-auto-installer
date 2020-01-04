const fs = require('fs');
const chokidar = require('chokidar');
const {execSync} = require('child_process');
const chalk = require('chalk')

const isPackageJSONExist = () => fs.existsSync('package.json');

const getPackageManager = () => {
    let packageManager = 'npm';
    try {
        const file = fs.readFileSync('yarn.lock');
        if (file) {
            packageManager = 'yarn'
            console.log('npm is detected as the default package manager')
        }
    } catch (ex) {
        console.log('npm is detected as the default package manager');
    }
    return packageManager;
}

const updateNodeModules = () => {
    const packageManager = getPackageManager();
    const isSuccessful = true;
    try {
        console.log(chalk.blue('updating node_modules'))
        execSync(`${packageManager} install`, {encoding: 'utf8'});
    } catch (error) {
        isSuccessful = false;
    }
    return isSuccessful;
}

const runner = () => {
    if(!isPackageJSONExist()) {
        console.log(chalk.red("package.json file isn't present"))
        console.log(chalk.red("try running npm init -y to create one"))
        return;
    }

    let watcher = chokidar.watch('package.json');
    watcher.on('change', path => {
        const success = updateNodeModules();
        if (success) console.log(chalk.green('node_modules updated'))
        else console.log(chalk.red('an error occurred while updating node_modules'))
    })
}

runner();
