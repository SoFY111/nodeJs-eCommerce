module.exports = {
	options: {
		definition: {
			info: {
				description: 'eCommerce',
				title: 'eCommerce',
				version: '1.0.0'
			},
			host: 'localhost:5000',
			basePath: '',
			produces: [
				'application/json',
				'application/xml'
			],
			schemes: [ 'http', 'https' ]
		},
		basedir: __dirname, // app absolute path
		files: [
			'../../Public/Routes/*.js'
			//'../../Private/Controllers/*.js'
		]
	}
};