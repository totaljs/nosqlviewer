NEWSCHEMA('Stats', function(schema) {

	schema.define('filename', 'String(200)', true);
	schema.define('rows', Number);
	schema.define('cols', Number);

	schema.setSave(function($) {

		var model = $.clean();

		model.created = new Date();
		model.ip = $.ip;

		NOSQL('stats').insert(model);
		$.success();
	});

});