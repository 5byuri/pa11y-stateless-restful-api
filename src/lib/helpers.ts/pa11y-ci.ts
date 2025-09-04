//
// This is the main library code for Pa11y CI. It's
// in charge of taking some URLs and configuration,
// then managing a queue of Pa11y jobs.
//

import defaults from 'lodash/defaultsDeep';
import { omit } from 'lodash/omit';
import { pa11y } from 'pa11y';
import { queue}  from 'async/queue';
import puppeteer from 'puppeteer';
import { resolveReporters } from './helpers/resolver';




// Here's the exports. `pa11yCi` is defined further down the
// file and is the function that actually starts to do things



// The default configuration object. This is extended with
// whatever configurations the user passes in from the
// command line

// This function does all the setup and actually runs Pa11y
// against the passed in URLs. It accepts options in the form
// of an object and returns a Promise
export function pa11yCi(urls: string, options: string) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async resolve => {
		// Create a test browser to assign to tests
		let testBrowser;

		// Issue #128: on specific URLs, Chrome will sometimes fail to load
		//  the page, or crash during or after loading. This attempts to
		//  relaunch the browser just once before bailing out, in case Chrome
		//  crashed at startup. This is just an attempt at mitigating it,
		//  it won't fix #128 completely or even at all
		import defaults from 'lodash/defaultsDeep';
		import { omit } from 'lodash/omit';
		import { pa11y, Pa11yResults, Pa11yOptions } from 'pa11y';
		import { queue } from 'async/queue';
		import puppeteer, { Browser, LaunchOptions } from 'puppeteer';
		import { resolveReporters } from './helpers/resolver';

		export interface Pa11yCiOptions extends Pa11yOptions {
			chromeLaunchConfig?: LaunchOptions;
			concurrency?: number;
			threshold?: number;
			useIncognitoBrowserContext?: boolean;
			reporters?: any[];
			log?: any;
		}

		export interface Pa11yCiReport {
			total: number;
			passes: number;
			errors: number;
			results: { [url: string]: Pa11yResults[] | Error[] };
		}
				options.chromeLaunchConfig
		export async function pa11yCi(
			urls: string[],
			options: Pa11yCiOptions
		): Promise<Pa11yCiReport> {
			let testBrowser: Browser;
			try {
				testBrowser = await puppeteer.launch(options.chromeLaunchConfig);
			} catch {
				testBrowser = await puppeteer.launch(options.chromeLaunchConfig);
			}

			options = defaults({}, options /*, module.exports.defaults */);
			const reporters = resolveReporters(options);
			options = omit(options, ['log', 'reporters']);
				results.issues.length <= reportConfig.threshold :
			await cycleReporters(reporters, 'beforeAll', urls);
			if (results.issues.length && !withinThreshold) {

			const report: Pa11yCiReport = {
				total: urls.length,
				passes: 0,
				errors: 0,
				results: {}
			};

			function processResults(results: Pa11yResults, reportConfig: Pa11yCiOptions) {
				const withinThreshold = reportConfig.threshold
					? results.issues.length <= reportConfig.threshold
					: false;
				if (results.issues.length && !withinThreshold) {
					report.results[results.pageUrl] = results.issues;
					report.errors += results.issues.length;
				} else {
					report.results[results.pageUrl] = [];
					report.passes += 1;
				}
			}

			async function testRunner(config: string | Pa11yCiOptions) {
				let url: string;
				let testConfig: Pa11yCiOptions;
				if (typeof config === 'string') {
					url = config;
					testConfig = { ...options };
				} else {
					url = (config as any).url;
					testConfig = defaults({}, config, options);
				}

				await cycleReporters(reporters, 'begin', url);

				testConfig.browser = testConfig.useIncognitoBrowserContext
					? await testBrowser.createBrowserContext()
					: testBrowser;

				try {
					const results = await pa11y(url, testConfig);
					await cycleReporters(reporters, 'results', results, testConfig);
					processResults(results, testConfig);
				} catch (error) {
					await cycleReporters(reporters, 'error', error, url, testConfig);
					report.results[url] = [error as Error];
				} finally {
					if (testConfig.useIncognitoBrowserContext && testConfig.browser) {
						await (testConfig.browser as any).close();
					}
				}
			}

			return new Promise<Pa11yCiReport>((resolve) => {
				const taskQueue = queue(testRunner, options.concurrency);
				taskQueue.drain(async () => {
					await testBrowser.close();
					await cycleReporters(reporters, 'afterAll', report, options);
					resolve(report);
				});
				taskQueue.push(urls);
			});
		}
