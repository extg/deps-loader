
const path = require('path');
const loaderUtils = require('loader-utils');
const simplifyDeps = require('simplify-deps');

module.exports = depsLoader;

function depsLoader(source) {
    let options = loaderUtils.getOptions(this);
    let levelsDump = options.levelsDump;
    let techs = options.techs;
    let context = path.basename(this.resourcePath, '.deps.js');
    let deps = simplifyDeps(context, source, {techs});

    let resolvedDeps = deps.reduce((acc, dep) =>
        acc.concat(getBlockDefenitions(dep, levelsDump)), []);

    // TODO: this.addDependency
    // TODO: разделение внешних(библиотечных,components) и изменяемых(проектных,своих) уровней переопределения
    // TODO: levelDump - должен определяет только те уровни которые не будут меняться, может их передавать, например, externalLevels
    // TODO: а в levels передавать собственные уровни переопределения, которые, если даже путь не сущетвует все равно добавлять в зависимости (this.addDependency)

    // debug-log
    // console.log(`// ${this.resourcePath}`);
    // console.log(resolvedDeps);

    return resolvedDeps.map(dep => `require('${dep}');`).join('\n');
}

/**
 * Находит вхождение блока на всех уровнях
 * @param {String} bemPath
 * @param {Array<String>} levelsDump
 * @return {Array<String>}
 */
function getBlockDefenitions(bemPath, levelsDump) {
    let regexp = new RegExp(bemPath.replace('/', '\\/'), 'i');

    return levelsDump.filter(val => regexp.test(val));
}
