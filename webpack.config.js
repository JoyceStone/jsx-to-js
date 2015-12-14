String.prototype.endWith = function(str) {
    var len = this.length;
    if (this.indexOf(str) === len - 3)
        return true;
    return false;
}

function getJsFilesPath(dir) {

    var files;

    try {
        files = fs.readdirSync(dir);
        files.forEach(function(filename) {
            var p = path.resolve(dir, filename);
            try {
                getJsFilesPath(p);
            } catch (err) {
                if (filename.endWith('.js')) {
                    entries[path.relative(basePath,path.resolve(dir,filename)).slice(0,-3)] = p;
                }
            }
        });

    } catch (e) {
        console.log(dir);
        // return ;
        if (dir.endWith('.js')) {
            entries[path.relative(basePath,dir).slice(0,-3)] = dir;
        }
    }
}

var path = require('path'),
    webpack = require('webpack'),
    node_modules_dir = path.resolve(__dirname, 'node_modules'),
    fs = require('fs'),

    compileConfigObject = require('./compile.config.js'),
    inputPath = compileConfigObject.inputPath,
    basePath = path.resolve(__dirname,compileConfigObject.basePath),

    entries = {},
    needCombiledPath = path.resolve(basePath, inputPath);

getJsFilesPath(needCombiledPath);

var config = {
    entry: entries,
    output: {
        /*library: 'react-bootstrap',
        libraryTarget : 'amd',*/
        path: path.resolve(__dirname, compileConfigObject.outputPath),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve('D:/jsx-to-js/node_modules'),
        fallback: path.join(__dirname, "node_modules")
    },
    resolveLoader: {
        // root: path.join(__dirname, "node_modules")
        root: path.resolve('D:/jsx-to-js/node_modules')
    },
    // 压缩 打包
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),*/
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};

module.exports = config;