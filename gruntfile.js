module.exports = function(grunt) {
    grunt.initConfig({
        // Watch task config
        watch: {
            sass: {
                files: "scss/**/*.scss",
                tasks: ['sass']
            }
        },
        // SASS task config
        sass: {
            dev: {
                files: {
                    // destination				 // source file
                    "public/css/loodio.css": "scss/app.scss"
                }
            }
        },
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "src/css/*.css",
                        "src/**/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    startPath: "index.html",
                    server: {
                        baseDir: ['src'],
                        routes: {
                            '/css': 'css',
                            '/js': 'js',
                            '/img': 'img',
                            '/bower_components': 'bower_components',
                            '/css/svg': 'img/sprites/view/svg',
                            '/svg': 'img/sprites/view/svg',
                            '/files': 'files'
                        },
                        index: "index.html"
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
    grunt.registerTask('scss', ['sass']);
};

