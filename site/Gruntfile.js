module.exports = function(grunt){
	// load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
		'grunt-contrib-less',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});
		 																				
	// configure plugins
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		jshint: {
			app: ['labstatus.js', 'public/js/**/*.js',
				'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		},
		exec: {
			linkchecker:
				{ cmd: 'linkchecker http://localhost:3000' }
		},
		less: {
			development: {
				options: {
					customFunctions: {
						static: function(lesObject, name) {
							return 'url("' + 
								require('./lib/static.js').map(name.value) +
								'")';
						}
					}
				},				

				files: {
			    		'public/css/main.css': 'less/main.less',
				}
		    	}
		}
	});

	// register tasks
	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};
