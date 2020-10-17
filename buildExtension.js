const fs = require('fs');
const archiver = require('archiver');
const process = require('process');
// see https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md
const webStore = require('chrome-webstore-upload')({
    extensionId: process.env.ZOOMSTATS_EXTENSION_ID,
    clientId: process.env.CWS_CLIENT_ID,
    clientSecret: process.env.CWS_CLIENT_SECRET,
    refreshToken: process.env.CWS_REFRESH_TOKEN
});

const packageExtension = function () {
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

packageExtension().then(uploadExtension).catch(function (error) {
    console.log(error);
});

function uploadExtension() {
    const extensionSource = fs.createReadStream('./dist/zoomstats.zip');

    webStore.uploadExisting(extensionSource).then(res => {
        console.log('Successfully uploaded the ZIP');

        webStore.publish().then(res => {
            console.log('Successfully published the newer version');
        }).catch((error) => {
            console.log(`Error while publishing uploaded extension: ${error}`);
            process.exit(1);
        });
    }).catch((error) => {
        console.log(`Error while uploading ZIP: ${error}`);
        process.exit(1);
    });
}
