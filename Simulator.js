var Simulator = function() {
	this._running = false;
	this._nbPeersMax = 10;
	this._peerPool = [];
	this._peerPoolIndex = 0;
	this._randomIntervals = [];
	this._cdnDownloaded = 0;
};

Simulator.prototype.switch = function() {
	this._running ? this.stop() : this.start();
	this._running = !this._running;
	document.getElementById('simulator-switch').innerHTML = this._running ? 'Stop' : 'Start';
};

Simulator.prototype.start = function() {
	this._addAllPeersInPool();
	this._startDownloadCDN();
	this._startRandomEvents();
};

Simulator.prototype.stop = function() {
	this._stopRandomEvents();
	this._stopDownloadCDN();
	this._peerPool = [];
};

Simulator.prototype.getStats = function() {
	var peerPool = [];
	this._peerPool.forEach(function(peer) {
		peerPool.push({
			getBufferLevel: function() { return peer.bufferLevel; },
			getConnected: function () { return peer.connected; },
			getDataDownloaded: function() { return peer.downloaded; },
			getDataUploaded: function() { return peer.uploaded; },
			getId: function () { return peer.id; },
			getRtt: function() { return peer.rtt; }
		});
	});
	return {
		download: {
			cdnDownloaded: this._cdnDownloaded
		},
		peerPool: peerPool
	};
};

Simulator.prototype._startDownloadCDN = function() {
	var self = this;
	this._cdnInterval = setInterval(function() {
		self._cdnDownloaded += 320261;
	}, 500);
};

Simulator.prototype._stopDownloadCDN = function() {
	clearInterval(this._cdnInterval);
	this._cdnDownloaded = 0;
};

Simulator.prototype._addAllPeersInPool = function() {
	for (var i = 0; i < this._nbPeersMax; i++) {
		this._addPeerInPool();
	}
};

Simulator.prototype._startRandomEvents = function() {
	this._startRandomDisconnections();
	this._startRandomExclusion();
	this._startRandomSpeeds();
};

Simulator.prototype._stopRandomEvents = function() {
	this._randomIntervals.forEach(function(interval) {
		clearInterval(interval);
	});
	this._randomIntervals = [];
};

Simulator.prototype._startRandomDisconnections = function() {
	var fn = function() {
		this._reconnectAllPeers();
		var nbToDisconnect = this._getRandomInteger(0, 3);
		var peersToDisconnect = _.sample(this._peerPool, nbToDisconnect);
		peersToDisconnect.forEach(function(peer) {
			peer.disconnect();
		});
	};
	var interval = setInterval(fn.bind(this), 20 * 1000);
	this._randomIntervals.push(interval);
};

Simulator.prototype._reconnectAllPeers = function () {
	this._peerPool.forEach(function(peer) {
		if (!peer.connected) {
			peer.connect();
		}
	});
};

Simulator.prototype._startRandomExclusion = function () {
	var self = this;
	var fn = function () {
		var number = this._getRandomInteger(-2, 2);
		if (number > 0) {
			var nbPeersToAdd = Math.min(number, this._nbPeersMax - this._peerPool.length);
			for (var i = 0; i < nbPeersToAdd; i++) {
				self._addPeerInPool();
			}
		} else if (number < 0) {
			var nbPeersToRemove = Math.min(Math.abs(number), this._peerPool.length);
			var peersToRemove = _.sample(this._peerPool, nbPeersToRemove);
			peersToRemove.forEach(function(peer) {
				peer.disconnect();
				self._removePeer(peer.id);
			});
		}
	};
	var interval = setInterval(fn.bind(this), 30 * 1000);
	this._randomIntervals.push(interval);
};

Simulator.prototype._addPeerInPool = function() {
	this._peerPool.push(new Peer(this._peerPoolIndex, this._getRandomInteger(0, 20), this._getRandomInteger(50, 500)));
	this._peerPoolIndex++;
};

Simulator.prototype._removePeer = function(id) {
	this._peerPool = _.reject(this._peerPool, function(peer) {
		return peer.id === id;
	});
};

Simulator.prototype._startRandomSpeeds = function () {
	var self = this;
	var fn = function () {
		this._peerPool.forEach(function(peer) {
			peer.setDownloadSpeed(self._getRandomInteger(10,100));
			peer.setUploadSpeed(self._getRandomInteger(10,100));
		});
	};
	var interval = setInterval(fn.bind(this), 10 * 1000);
	this._randomIntervals.push(interval);
};

Simulator.prototype._getRandomInteger = function(start, end) {
	return Math.floor(Math.random()*(end-start+1)+start);
};
