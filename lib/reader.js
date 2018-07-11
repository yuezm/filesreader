'use strict';
const fs = require('fs');
const util = require('util');
const path = require('path');

const readDir = util.promisify(fs.readdir);
const stat = util.promisify(fs.lstat);

async function readFiles(entry) {
  const stats = await stat(entry);
  const allFilePath = [];
  const allDirPath = [];
  if (stats.isDirectory()) {
    allDirPath.push(entry);
    const dir = await readDir(entry);
    for (let item of dir) {
      const paths = await readFiles(path.join(entry, item));
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

module.exports = readFiles;

