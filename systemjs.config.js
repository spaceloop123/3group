/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'dist/app', // 'dist',
    '@angular':                   'node_modules/@angular',
    '@angular/forms':             'https://npmcdn.com/@angular/forms@0.2.0',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'jquery':                     'node_modules/jquery',
    'materialize':                'node_modules/materialize-css',
    'angular2-materialize':       'node_modules/angular2-materialize',
    'rxjs':                       'node_modules/rxjs',
    'ng2-charts':                 'node_modules/ng2-charts',
    'angular2-localstorage':      'node_modules/angular2-localstorage'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-charts':                 { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'jquery':                     { main: 'dist/jquery.min.js', defaultExtension: 'js'},
    'materialize':                { main: 'dist/js/materialize.min.js', defaultExtension: 'js', format: 'global'},
    'angular2-materialize':       { main: 'dist/index.js', defaultExtension: 'js' },
    '@angular/forms':             { main: 'index.js', defaultExtension: 'js' },
    'angular2-localstorage':      { defaultExtension: "js" }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade'
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
