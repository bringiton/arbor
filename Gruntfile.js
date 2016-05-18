module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass : {
            dist : {
                options : {
                    style : 'compressed',
                    update : true,
                    trace: true,
                    loadPath: require('node-bourbon').includePaths
                },
                files : [
                    {'build/css/index.css': 'development/scss/index.scss'}
                ]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {src: 'build/css/index.css'}
        },
        uglify: {
            options : {
                mangle: false,
                beautify: true
            },
            dist: {
                files: [
                    {
                        'build/js/arbor-app.js': [
                            'node_modules/jquery/dist/jquery.min.js',
                            'development/js/jquery-ui.js',
                            'node_modules/bootstrap/dist/js/bootstrap.min.js',
                            'node_modules/angular/angular.min.js',
                            'node_modules/angular-route/angular-route.min.js',
                            'node_modules/angular-animate/angular-animate.min.js',
                            'development/js/app/config.js',
                            'development/js/app/controllers/*',
                            'development/js/app/services/*',
                            'development/js/app/directives/*',
                            'development/js/app/routes/*',
                            'development/js/index.js'
                        ]
                    }
                ]
            }
        },
        notify: { build: { options: { title: '', message: 'Grunt tasks finished'} } },
        watch : {
            stylesheets: {
                files: ['development/scss/*.scss', 'development/scss/**/*.scss'],
                tasks: ['sass', 'notify']
            },
            javascript: {
                files: ['development/js/app/*.js', 'development/js/app/*/**.js'],
                tasks: ['uglify', 'notify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('build',   ['base', 'notify']);
    grunt.registerTask('default', ['base', 'watch']);
    grunt.registerTask('base',    ['uglify', 'sass', 'postcss', 'notify']);
};
