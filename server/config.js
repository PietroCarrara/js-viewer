var config = {}

if (process.argv.length < 3) { // We haven't received a target, use current dir
    config.target = '.';
} else { // We have a target. Make sure it does NOT end with '/'
    const target = process.argv[2];
    if (target.endsWith('/')) {
        config.target = target.substring(0, target.length - 1);
    } else {
        config.target = target;
    }
}

module.exports = config;