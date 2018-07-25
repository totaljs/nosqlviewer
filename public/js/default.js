var REGUID = /^\d{14,}[a-z]{3}[01]{1}$/;

function toString(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function toBase64(buffer) {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++)
		binary += String.fromCharCode(bytes[i]);
	return window.btoa(binary);
}

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

Tangular.register('filesize', function(value, decimals, type) {
	return value ? value.filesize(decimals, type) : '...';
});

String.prototype.isUID = function() {
	return this.length < 18 ? false : REGUID.test(this);
};

Number.prototype.filesize = function(decimals, type) {

	if (typeof(decimals) === 'string') {
		var tmp = type;
		type = decimals;
		decimals = tmp;
	}

	var value;

	// this === bytes
	switch (type) {
		case 'bytes':
			value = this;
			break;
		case 'KB':
			value = this / 1024;
			break;
		case 'MB':
			value = filesizehelper(this, 2);
			break;
		case 'GB':
			value = filesizehelper(this, 3);
			break;
		case 'TB':
			value = filesizehelper(this, 4);
			break;
		default:

			type = 'bytes';
			value = this;

			if (value > 1023) {
				value = value / 1024;
				type = 'KB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'MB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'GB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'TB';
			}

			break;
	}

	type = ' ' + type;
	return (decimals === undefined ? value.format(2).replace('.00', '') : value.format(decimals)) + type;
};

function filesizehelper(number, count) {
	while (count--) {
		number = number / 1024;
		if (number.toFixed(3) === '0.000')
			return 0;
	}
	return number;
}
