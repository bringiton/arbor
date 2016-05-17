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
        // notify: { build: { options: { title: '', message: 'Grunt tasks finished'} } },
        watch : {
            stylesheets: {
                files: ['development/scss/*.scss', 'development/scss/**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('build',   ['base']);
    grunt.registerTask('default', ['base', 'watch']);
    grunt.registerTask('base',    ['sass', 'postcss']);
};
