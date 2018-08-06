'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
    enable: true,
    package: 'egg-validate'
}

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
}

exports.mysql = {
    enable: true,
    package: 'egg-mysql'
}

exports.redis = {
    enable: true,
    package: 'egg-redis'
}