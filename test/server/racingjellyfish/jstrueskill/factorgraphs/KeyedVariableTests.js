var KeyedVariable = require('../../../../../src/racingjellyfish/jstrueskill/factorgraphs/KeyedVariable');

exports.testBasicValues = function(test) {
	var variable = new KeyedVariable('key', -1, 'Test');

	var expected = 'key';
	test.equal(variable.getKey(), expected, "Expected key to be: " + expected);
	expected = -1;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Test]';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};