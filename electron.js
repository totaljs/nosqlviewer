require('total.js');
const net = require('net');

function find_port(port = 45011, cb) {
    var server = net.createServer();

    server.listen(port, function () {
        server.once('close', () => cb(port));
        server.close();
    });
    server.on('error', () => getPort(port += 1, cb));
}

function wrapper() {
    const {app, BrowserWindow} = require('electron');

    let win;

    function createWindow() {
        win = new BrowserWindow({minWidth: 800, height: 600});
        // win.loadFile('index.html');

        win.on('closed', () => win = null);
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit();
    });

    app.on('activate', () => {
        if (win === null)
            createWindow();
    });
}

find_port(undefined, function (port) {
    let options = {ip: '127.0.0.1', port};

    console.log(`Internal nosqlviewer server started at ${options.ip}:${options.port}`);
    F.on('load', wrapper);
    F.http('release', options);
});
