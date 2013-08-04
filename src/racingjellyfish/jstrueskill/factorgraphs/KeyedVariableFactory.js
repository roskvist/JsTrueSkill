var util = require('util');
var KeyedVariable = require('./KeyedVariable');
var VariableFactory = require('./VariableFactory');

/**
 * A factory for creating Variables.
 *
 * Constructor for a prior initializer.
 */
var KeyedVariableFactory = function(variablePriorInitializer) {
	KeyedVariableFactory.super_.call(this, variablePriorInitializer);
};

util.inherits(KeyedVariableFactory, VariableFactory);

VariableFactory.prototype.createKeyedVariable = function(key, nameTemplate, templateArgs) {
	return new KeyedVariable(key, this.variablePriorInitializer.call(), nameTemplate, templateArgs);
};

module.exports = KeyedVariableFactory;
