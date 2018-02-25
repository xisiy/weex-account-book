const path = require('path');
const fs = require('fs-extra');

let config;
let ignore = {};
let nativeEntry = {};
let isProd = process.env.NODE_ENV == 'production';

const cleanCache = () => {
    fs.removeSync(path.join(config.root,config.web.outputPath));
    fs.removeSync(path.join(config.root,config.native.outputPath));
}

const setNativeEntry = (dir) => {
    dir = dir || '.';
    const directory = path.join(config.root, config.source , dir);
    fs.readdirSync(directory).forEach((file)=>{
        const fullpath = path.join(directory, file);
        const stat = fs.statSync(fullpath);
        const extname = path.extname(fullpath);
        if(ignore[fullpath]){return;}

        if (stat.isFile() && extname === '.vue' || extname === '.we') {
            const name = path.join(dir, path.basename(file, extname));
            nativeEntry[name] = fullpath + '?entry=true';
        } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
            const subdir = path.join(dir, file);
            setNativeEntry(subdir);
        }
    })
}

module.exports = (conf) => {
    config = conf;
    if(isProd){
        cleanCache();
    }
    let rootSource = path.join(config.root, config.source);
    for(let idx in config.native.ignore){
        ignore[path.join(rootSource, config.native.ignore[idx])] = true;
    }
    setNativeEntry();
    return {
        web:{
            index: path.join(config.root, config.web.entryPath)
        },
        native:nativeEntry
    }
}