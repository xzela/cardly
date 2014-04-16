var cluster = require('cluster'),
	os = require('os'),
	log = require('log4js');

var logger = log.getLogger(__filename);

if (cluster.isMaster) {
	// Count the machine's CPUs
	var cpuCount = os.cpus().length;

	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}
	// handle events for worker threads
	cluster.on("online", function (worker) {
		logger.info("thread: " + worker.id + ":" + worker.process.pid + " is online!");
	});

	cluster.on("listening", function (worker, address) {
		logger.info("thread: " + worker.id + ":" + worker.process.pid + " is listening for instructions on: " + address.address + ":" + address.port);
	});

	cluster.on("exit", function (worker, code, signal) {
		logger.error("Worker: " + worker.id + ":" + worker.process.pid + " has died from: " + code + ": " + signal);
		logger.info("restarting worker thread...");
		cluster.fork();
	});


} else {
	var app = require('./app');
}
