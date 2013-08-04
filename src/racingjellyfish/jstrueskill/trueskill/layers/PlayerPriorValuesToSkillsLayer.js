var util = require('util');
var Rating = require('../../Rating');
var DefaultVariable = require('../../factorgraphs/DefaultVariable');
var KeyedVariable = require('../../factorgraphs/KeyedVariable');
var Schedule = require('../../factorgraphs/Schedule');
var ScheduleSequence = require('../../factorgraphs/ScheduleSequence');
var ScheduleStep = require('../../factorgraphs/ScheduleStep');
var Variable = require('../../factorgraphs/Variable');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var MathUtils = require('../../numerics/MathUtils');
var GaussianPriorFactor = require('../factors/GaussianPriorFactor');
var TrueSkillFactorGraphLayer = require('./TrueSkillFactorGraphLayer');

// We intentionally have no Posterior schedule since the only purpose here is to...
var PlayerPriorValuesToSkillsLayer = function(parentGraph, teams) {
    PlayerPriorValuesToSkillsLayer.super_.call(this, parentGraph);

	this.teams = teams;
};

util.inherits(PlayerPriorValuesToSkillsLayer, TrueSkillFactorGraphLayer);

PlayerPriorValuesToSkillsLayer.prototype.buildLayer = function() {
	for (var i = 0; i < this.teams.length; i++) {
		var currentTeam = this.teams[i];
		var currentTeamSkills = [];

		// TODO currentTeam is a map?
		for (var j = 0 ; j < currentTeam.getPlayers().length; j++) {
			var currentTeamPlayer = currentTeam.getPlayers()[j];
			var currentTeamPlayerRating = currentTeam.getPlayerRating(currentTeamPlayer);
			var playerSkill = this.createSkillOutputVariable(currentTeamPlayer);
			this.addLayerFactor(
				this.createPriorFactor(currentTeamPlayer,
				currentTeamPlayerRating, playerSkill));
			currentTeamSkills.push(playerSkill);
		}

		this.addOutputVariableGroup(currentTeamSkills);
	}
};

PlayerPriorValuesToSkillsLayer.prototype.createPriorSchedule = function() {
	var schedules = [];
	var localFactors = this.getLocalFactors();
	for (var i = 0; i < localFactors.length; i++) {
		var prior = localFactors[i];
		schedules.push(new ScheduleStep("Prior to Skill Step", prior, 0));
	}
	return this.createScheduleSequence(schedules, "All priors");
};

PlayerPriorValuesToSkillsLayer.prototype.createPriorFactor = function(player, priorRating,
	skillsVariable) {
	return new GaussianPriorFactor(priorRating.getMean(),
		MathUtils.square(priorRating.getStandardDeviation()) +
		MathUtils.square(this.getParentFactorGraph().getGameInfo().getDynamicsFactor()),
		skillsVariable);
};

PlayerPriorValuesToSkillsLayer.prototype.createSkillOutputVariable = function(playerKey) {
	return new KeyedVariable(playerKey, GaussianDistribution.UNIFORM, "%s's skill",
		playerKey.toString());
};

module.exports = PlayerPriorValuesToSkillsLayer;
