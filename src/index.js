const fs = require('fs');
const chokidar = require('chokidar');
const {execSync} = require('child_process');
const chalk = require('chalk');
const readPkgUp = require('read-pkg-up');

let previouslyInstalledPackages;

if(!fs.existsSync('package.json')) {
    console.log(chalk.red("package.json file isn't present"))
    console.log(chalk.red("try running npm init -y to create one"))
    return;
}

const getInstalledPackages = async () => {
    const packages = await readPkgUp();
    return `{ "dependencies": ${JSON.stringify(packages.packageJson.dependencies)}, "devDependencies": ${JSON.stringify(packages.packageJson.devDependencies)}}`
}

const copyPackages = async () => {
    let packages = await getInstalledPackages();
    fs.writeFileSync('src/installed-packages.json', packages)
    previouslyInstalledPackages = fs.readFileSync('src/installed-packages.json');
}


const getPackageManager = () => {
    let packageManager = 'npm';
    try {
        const file = fs.readFileSync('yarn.lock');
        if (file) {
            packageManager = 'yarn'
            console.log('yarn is detected as the default package manager')
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

const start = async () => {
    await copyPackages();
    console.log(chalk.green("watching......"));

    let watcher = chokidar.watch('package.json', { interval: 1000 });
    watcher.on('change', async () => {
        let packages = await getInstalledPackages();
        previouslyInstalledPackages = JSON.stringify(JSON.parse(previouslyInstalledPackages));
        packages = JSON.stringify(JSON.parse(packages))
        if (previouslyInstalledPackages !== packages)
        {
            const success = updateNodeModules();
            console.log(success);
            if (success) {
                 console.log(chalk.green('node_modules updated'))
                 await copyPackages();
                 return console.log(chalk.green("watching......"))
            }
            return console.log(chalk.red('an error occurred while updating node_modules'))
        };
        console.log(chalk.blueBright("no changes found"))
        console.log(chalk.green("watching......"));
    });
}

start()
