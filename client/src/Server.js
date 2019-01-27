const serverAddr = 'http://192.168.0.11';
const serverPort = 8000;

const fullServerAddr = serverAddr + ':' + serverPort;

function url (route) {
    return fullServerAddr + route;
}

function img(path) {
    return fullServerAddr + '/img/?path=' + path;
}

export { serverAddr, serverPort, fullServerAddr, url, img };