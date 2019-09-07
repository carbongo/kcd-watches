const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const MASTER_JS_FILE = './src/scripts/master.js',
    MASTER_HTML_FILE = './src/index.html',
    OUTPUT_FOLDER = 'public',
    OUTPUT_MASTER_JS = '[name].bundle.js';

module.exports = env => {

    return {
        mode: env.mode || 'none',

        entry: {
            main: MASTER_JS_FILE
        },

        output: {
            filename: OUTPUT_MASTER_JS,
            path: path.resolve(__dirname, OUTPUT_FOLDER)
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }, {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                }, {
                    test: /\.(jpe?g|png|gif|ico|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
                }
            ]
        },

        devtool: env.mode !== 'production'
            ? 'inline-source-map'
            : 'none', // Disabled on production

        devServer: {
            contentBase: `./${OUTPUT_FOLDER}`,
            compress: true,
            port: 8000
        },

        plugins: getPlugins(env)
    }
}

function getHtmlWebpackPluginOpt(env) {
    const opt = {
        template: MASTER_HTML_FILE,
        minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true
        },
        inlineSource: '.(js|css)$'
    }
    return opt;
}

function getPlugins(env) {
    const plugins = [
        new HtmlWebpackPlugin(getHtmlWebpackPluginOpt(env)),
        new HtmlWebpackInlineSourcePlugin()
    ];
    return plugins;
}