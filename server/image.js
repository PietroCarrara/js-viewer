var sharp = require('sharp')

class Image {

    /**
     * A class representing a image, with manipulation methods
     * @param {string} path The path of the image file.
     */
    constructor(path) {
        this.path = path;

        this.sharp = sharp(path);
    }

    resize(width, height) {
        this.sharp = this.sharp.resize(width, height, {
            fit: sharp.fit.inside,
        });
        return this;
    }

    jpeg() {
        this.sharp = this.sharp.jpeg();
        return this;
    }

    png() {
        this.sharp = this.sharp.png();
        return this;
    }

    toBuffer() {
        return this.sharp.toBuffer();
    }
}

module.exports.Image = Image;