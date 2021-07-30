const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

try {
    const configPath = core.getInput('path');
    const fullPath = path.resolve(configPath);
    core.info(`Processing file: ${fullPath}`);

    const contents = fs.readFileSync(fullPath);
    const config = JSON.parse(contents);

    const flutterSdkVersion = config['flutterSdkVersion'];
    const parts = flutterSdkVersion.split('@');

    const version = parts[0];
    const channel = parts.length > 1 ? parts[1] : 'stable';

    function setVariable(name, value) {
        core.info(`SET ENV '${name}' = ${value}`);
        core.exportVariable(name, value);
    }

    setVariable('FLUTTER_VERSION', version);
    setVariable('FLUTTER_CHANNEL', channel);
} catch (error) {
    core.setFailed(error.message);
}

