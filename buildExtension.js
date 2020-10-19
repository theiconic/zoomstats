const fs = require('fs');
const archiver = require('archiver');
const process = require('process');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// see https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md
const webStore = require('chrome-webstore-upload')({
    extensionId: process.env.ZOOMSTATS_EXTENSION_ID,
    clientId: process.env.CWS_CLIENT_ID,
    clientSecret: process.env.CWS_CLIENT_SECRET,
    refreshToken: process.env.CWS_REFRESH_TOKEN
});

const packageExtension = () => {
    console.info('Packaging extension');

    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(__dirname + '/dist/zoomstats.zip');
        const zip = archiver('zip');

        output.on('close', function () {
            resolve();
        });

        // good practice to catch this error explicitly
        zip.on('error', function (err) {
            reject(err);
        });

        zip.pipe(output);
        zip.directory('dist/extension', false);
        zip.file('key.pem');
        zip.finalize();
    });
};

webpack(webpackConfig, (err, stats) => {
    if (err) {
        console.error(err.stack || err);

        if (err.details) {
            console.error(err.details);
        }

        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
        return;
    }

    if (stats.hasWarnings()) {
//        console.warn(info.warnings);
    }

    packageExtension().then(() => {
        console.info('done');
    }).catch(function (error) {
        console.error(error);
    });
});
