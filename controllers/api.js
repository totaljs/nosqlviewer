exports.install = function() {
	ROUTE('POST /api/stats/      *Stats --> @save');
	ROUTE('GET  /api/download/', download);
};

function download() {
	var self = this;
	self.custom();
	U.download(self.query.url, ['get'], function(err, response) {

		if (err) {
			self.throw401();
			return;
		}

		var headers = [];
		headers['content-type'] = 'text/plain';
		self.res.writeHead(200, headers);
		response.pipe(self.res);
	});
}