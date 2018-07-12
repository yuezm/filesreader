'use strict';
const fs = require('fs');
const util = require('util');
const path = require('path');
const Events = require('events');

const readDir = util.promisify(fs.readdir);
const stat = util.promisify(fs.lstat);
const readFiles = Symbol('readFiles');

class FilesReader extends Events.EventEmitter {
  constructor() {
    super();
  }

  read(entry) {
    const _this = this;
    _this[ readFiles ](path.resolve(entry)).then(res => {
      _this.emit('end', null, res);
    }).catch(err => {
      _this.emit('error', err);
    });
    return _this;
  }

  readPromise(entry) {
    return this[ readFiles ](path.resolve(entry));
  }

  fileFilter(name, callback) {
    this.matchName = path.resolve(name);
    this.matchCallback = typeof callback === 'function' ? callback : null;
    return this;
  }

  async [ readFiles ](entry) {
    const stats = await stat(entry);
    const _this = this;
    const allFilePath = [];
    const allDirPath = [];
    if (_this.matchCallback && _this.matchName && _this.matchName === entry) {
      _this.matchCallback();
      _this.matchCallback = null;
    }
    if (stats.isDirectory()) {
      allDirPath.push(entry);
      const dir = await readDir(entry);
      for (let item of dir) {
        const paths = await _this[ readFiles ](path.join(entry, item));
        allFilePath.push(...paths.allFilePath);
        allDirPath.push(...paths.allDirPath);
      }
    } else {
      return {
        allFilePath: [ entry ],
        allDirPath: [],
      };
    }
    return {
      allFilePath,
      allDirPath,
    };
  }
}

module.exports = new FilesReader();

