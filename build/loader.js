const config = require('./config.js');

module.exports =  function(source) {
    if(config.native.mixin.enable){
        let tag = '<script>';
        tag += 'import mixin from \'' + config.native.mixin.path + '\'';
        tag += 'Vue.mixin( mixin );';
        source = source.replace(/(<script>)/,tag);
    }
    return source;
};