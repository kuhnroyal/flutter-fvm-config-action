const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
    let configPath = core.getInput('path');

    if (configPath) {
        core.info(`Using specified config path: ${configPath}`);
    } else {
        configPath = '.fvmrc';
        const fullPath = path.resolve(configPath);
        if (fs.existsSync(fullPath)) {
            core.info(`Using default config from: ${fullPath}`);
        } else {
            configPath = '.fvm/fvm_config.json';
            const fullPath = path.resolve(configPath);
            if (fs.existsSync(fullPath)) {
                core.info(`Using default config from: ${fullPath}`);
            } else {
                core.setFailed('No valid FVM configuration file found!');
            }
        }
    }

    const fullPath = path.resolve(configPath);
    core.info(`Processing file: ${fullPath}`);

    const contents = fs.readFileSync(fullPath);
    const config = JSON.parse(contents);

    const flavor = core.getInput('flavor');
    let rawVersion;

    if (flavor && flavor !== '') {
        core.info(`Reading flavor: ${flavor}`);
        rawVersion = config['flavors'][flavor];

        if (rawVersion) {
            core.info(`Flavor found: ${flavor}, version: ${rawVersion}`);
        } else {
            core.setFailed(`Flavor not found: ${flavor}`);
            return;
        }
    } else {
        core.info(`Reading default version`);
        rawVersion = config['flutter'] ?? config['flutterSdkVersion'];
    }

    const parts = rawVersion.split('@');
    let version = parts[0];
    let channel = parts.length > 1 ? parts[1] : 'stable';

    const flutterChannels = ['stable', 'beta', 'master'];
    if (flutterChannels.includes(version)) {
        channel = version;
        version = '';
    }

    function setVariableAndOutput(name, value) {
        core.info(`SET ENV '${name}' = ${value}`);
        core.setOutput(name, value);
        core.exportVariable(name, value);
    }

    setVariableAndOutput('FLUTTER_VERSION', version);
    setVariableAndOutput('FLUTTER_CHANNEL', channel);
} catch (error) {
    core.setFailed(error.message);
}
