let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

let assetPath = 'public/assets/'
mix.setPublicPath(assetPath);

mix.js('src/js/app.js', assetPath + 'js').vue()

mix.sass('src/sass/app.sass', assetPath + 'css')
  .options({
    processCssUrls: false
    // purifyCss: true
  });

if (mix.inProduction()) {
  mix.version();
} else {
  // sourcemap fix https://webpack.js.org/configuration/devtool/#devtool
  mix.sourceMaps(false, 'inline-source-map');
}

mix.browserSync({
  proxy: process.env.MIX_BS_PROXY,
  files: [
    assetPath + "css/app.css",
    assetPath + "js/app.js",
    "public/**/*.html",
  ],
  ghostMode: true,
  open: false
});
