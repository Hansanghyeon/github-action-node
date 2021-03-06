const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');

/**
  |--------------------------------------------------------------------------
  | Mix Asset Management
  |--------------------------------------------------------------------------
  |
  | Mix provides a clean, fluent API for defining some Webpack build steps
  | for your Sage application. By default, we are compiling the Sass file
  | for your application, as well as bundling up your JS files.
  |
  **/

mix.setPublicPath('./public').browserSync('hyeon.local:10000');

mix
  .sass('resources/styles/app.scss', 'styles')
  .sass('resources/styles/editor.scss', 'styles')
  .sass('resources/styles/replybox.scss', 'styles')
  .options({
    processCssUrls: false,
    postCss: [require('tailwindcss')],
  });

mix
  .js('resources/scripts/app.js', 'scripts')
  .js('resources/scripts/customizer.js', 'scripts')
  .blocks('resources/scripts/editor.js', 'scripts')
  .autoload({ jquery: ['$', 'window.jQuery'] })
  .extract();

mix
  .copyDirectory('resources/images', 'public/images')
  .copyDirectory('resources/fonts', 'public/fonts');

mix.sourceMaps().version();

mix.webpackConfig({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|s?[ca]ss)$/,
        loader: 'import-glob',
      },
    ],
  },
});

if (!mix.inProduction()) {
  mix.webpackConfig({
    devtool: 'inline-source-map',
  });
}
