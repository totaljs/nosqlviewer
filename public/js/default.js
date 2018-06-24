var REGUID = /^\d{14,}[a-z]{3}[01]{1}$/;

Tangular.register('nosqlrender', function(val) {

	if (val === undefined)
		return '<span class="nosql-undefined">undefined</span>';

	if (val === null)
		return '<span class="nosql-null">null</span>';

	var type = typeof(val);

	if (type === 'string')
		return val.isUID() ? '<span class="nosql-uid">{0}</span>'.format(val) : '<span class="nosql-string">{0}</span>'.format(Thelpers.encode(val));

	if (type === 'number')
		return '<span class="nosql-number">{0}</span>'.format(val);

	if (type === 'boolean')
		return '<span class="nosql-boolean">{0}</span>'.format(val);

	if (val instanceof Date)
		return '<span class="nosql-date">{0}</span>'.format(val.format('yyyy-MM-dd HH:mm:ss'));

	return '<span class="nosql-json">{0}</span>'.format(Thelpers.encode(JSON.stringify(val)));
});

String.prototype.isUID = function() {
	return this.length < 18 ? false : REGUID.test(this);
};
