'use strict';

import loadReporter from './helpers.ts/loader';
import { ReporterConfig } from "../api";

const reporterShorthand = {
	sarif: require.resolve('../reporters/sarif.js')

};


module.exports = function resolveReporters(config: ReporterConfig = {}) {
	if (!Array.isArray(config.reporters) || config.reporters.length === 0) {
		return [];
	}
	return config.reporters.map(reporter => {
		let reporterOptions = {};
		if (Array.isArray(reporter)) {
			[reporter, reporterOptions = {}] = reporter;
		}
		if (typeof reporter !== 'string') {
			return undefined;
		}
		if (Object.keys(reporterShorthand).includes(reporter)) {
			reporter = reporterShorthand[reporter];
		}
		const reporterModule = loadReporter(reporter);

		if (typeof reporterModule === 'function') {
			return reporterModule(reporterOptions, config);
		}
		return reporterModule;
	}).filter(Boolean);
};
