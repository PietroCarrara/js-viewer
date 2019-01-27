const serverAddr = 'http://192.168.0.11';
const serverPort = 8000;

const fullServerAddr = serverAddr + ':' + serverPort;

const url = function (route) {
    return fullServerAddr + route;
}

export { serverAddr, serverPort, fullServerAddr, url };