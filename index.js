const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
    const configPath = core.getInput('path');

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
        rawVersion = config['flutterSdkVersion'];
    }

    const parts = rawVersion.split('@');
    let version = parts[0];
    let channel = parts.length > 1 ? parts[1] : 'stable';

    const flutterChannels = ['stable', 'beta', 'master'];
    if (flutterChannels.includes(version)) {
        channel = version;
        version = '';
    }

    function setVariableAndOutput(envName, outputName, value) {
        core.info(`SET ENV '${envName}' = ${value}`);
        core.setOutput(outputName, value);
        core.exportVariable(envName, value);
    }

    setVariableAndOutput('FLUTTER_VERSION', 'flutterVersion', version);
    setVariableAndOutput('FLUTTER_CHANNEL', 'flutterChannel', channel);
} catch (error) {
    core.setFailed(error.message);
}
