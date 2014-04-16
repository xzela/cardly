var cluster = require('cluster'),
	os = require('os');

if (cluster.isMaster) {
	// Count the machine's CPUs
	var cpuCount = os.cpus().length;

	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}

} else {
	var app = require('./app');
}
