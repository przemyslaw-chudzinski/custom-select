const mix = require('laravel-mix');

// Compile basic
mix.sass('src/scss/main.scss', 'dist/custom-select.css')
    .js('index.js', 'dist/custom-select.js');

// Compile theme a
mix.sass('src/scss/theme-a.scss', 'dist/theme-a.css');
