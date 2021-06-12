const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = { 
    mode: 'development',
    output: {
        clean: true, // Limpia todo, y vuelve a crear
    },
    module: {
        rules: [
            {
                test: /\.html$/i, // La i al final lo hace case insensitive
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebPack({
            title: 'Te estoy pisando el titulo de la app', // Define el titulo de la pagina
            template: './src/index.html', // Archivo del cual me quiero basar
            filename: './index.html', // Define el nombre con el que sale el archivo
        }),
        new MiniCssExtract({
            filename: '[name].css', // [name] le clava main.css como nombre. Fullhash se asegura que en prod no quede cacheado el archivo, porque si yo hago cambios el nombre tambien cambia y te obliga a bajar los cambios. Es una config para prod mas que para desarrollo
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
            {
                from: 'src/assets',
                to: 'assets/'
            }
            ]
        })
    ]
}