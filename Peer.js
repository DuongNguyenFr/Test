var Peer = function(id, bufferLevel, rtt) {
	this.rtt = rtt;
	this.bufferLevel = bufferLevel;
	this.id = id;
	this._intervalTime = 200; // milliseconds
	this.downloaded = 0;
	this.uploaded = 0;
	this.setDownloadSpeed(50);
	this.setUploadSpeed(50);
	this.connect();
};

Peer.prototype.connect = function() {
	this.connected = true;
	this._startInterval();
};

Peer.prototype.disconnect = function() {
	this.connected = false;
	this._stopInterval();
};

Peer.prototype.setDownloadSpeed = function(speed) {
	this._downloadSpeed = speed;
};

Peer.prototype.setUploadSpeed = function(speed) {
	this._uploadSpeed = speed;
};

Peer.prototype._startInterval = function() {
	var self = this;
	this._interval = setInterval(function() {
		self.downloaded += self._downloadSpeed * (self._intervalTime/1000);
		self.uploaded += self._uploadSpeed * (self._intervalTime/1000);
	}, this._intervalTime);
};

Peer.prototype._stopInterval = function() {
	clearInterval(this._interval);
};
