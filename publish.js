var root = process.argv[2];
var publishRoot = process.argv[3];
var buildCmd = 'npm run build';

require('shelljs/global');

var fs = require('fs');
var child_process = require('child_process');


var configOrigin = fs.readFileSync(`${root}/public/webpack.config.js`, 'utf8');
sed('-i', '"debug": true,', '"debug": false,', `${root}/public/webpack.config.js`);
// var config = configOrigin.replace(/var publicPath = .*;/, 'var publicPath = "PUBLIC_PATH";');
// fs.writeFileSync(`${root}/public/webpack.config.js`, config, 'utf8');
sed('-i', /var publicPath = .*;/,  'var publicPath = "PUBLIC_PATH";', `${root}/public/webpack.config.js`);
var log = child_process.execSync(`cd ${root} && ${buildCmd}`);
process.stdout.write(log);
fs.writeFileSync(`${root}/public/webpack.config.js`, configOrigin, 'utf8');


var list = fs.readdirSync(`${root}/dist/`);
var entryFile;
for (let fileName of list) {
    if (/^app\..*js$/.test(fileName)) {
        entryFile = fileName;
        break;
    }
}
console.log(`Main entry file: ${entryFile}`);
var entry = fs.readFileSync(`${root}/dist/${entryFile}`, 'utf8');
entry = entry.replace('"PUBLIC_PATH"', 'window.domainRes').replace("'PUBLIC_PATH'", 'window.domainRes');
fs.writeFileSync(`${root}/dist/${entryFile}`, entry, 'utf8');


var ds = [ 'local', 'dev', 'test', 'work' ];
ds.forEach((env) => {
    var envText = '-' + env;
    var testLoginResouces = '<link rel="stylesheet" href="//s.m.focustest.cn/login_resource/findpass_fix_sjh/stylesheets/pc/newlogin.css" />\
    <script type="text/javascript" src="//s.m.focustest.cn/login_resource/findpass_fix_sjh/scripts/pc/newlogin.js"></script>';
    var res = `//focus-res${envText}.cn/adv-fe/ecology-ad-front`;

    if (env === 'local') {
        res = '.';
    }
    if (env === 'work') {
        res = '//t-res.51f.com/adv-fe/ecology-ad-front';
    }

    // replace app.js
    var appScript = fs.readFileSync(`${root}/dist/${entryFile}`, 'utf8').replace('PUBLIC_PATH', res);


    // replace index.html
    var template = fs.readFileSync(`${root}/dist/index.html`, 'utf8');
    template = template.replace(/PUBLIC_PATH/g, res);
    template = template.replace("window.domainRes = './';", `window.domainRes = '${res}/';`);
    if (env !== 'work') {
        template = template.replace(/<!--占位符-->[\w\W]*<!--占位符-->/, testLoginResouces);
        console.log('当前环境' + env + ':' + template);
    }

    if (env !== 'local') {
        // fs.writeFileSync(`${publishRoot}/ds-conf/${env}/ecology-ad-front/${entryFile}`, appScript, 'utf8');
        fs.writeFileSync(`${publishRoot}/ds-conf/${env}/ecology-ad-front/index.html`, template, 'utf8');
    }
});


rm('-rf', `${publishRoot}/res/ecology-ad-front`);
cp('-rf', `${root}/dist`, `${publishRoot}/res/ecology-ad-front`);


console.log('success.')

