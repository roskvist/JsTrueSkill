var FactorGraph = require('../../../../../src/racingjellyfish/jstrueskill/factorgraphs/FactorGraph');

exports.testConstructor = function(test) {
	var factorGraph = new FactorGraph();

	test.ok(factorGraph !== undefined, "Expected valid object");

	test.done();
};