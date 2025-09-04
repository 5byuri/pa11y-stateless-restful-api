// Copyright (c) 2025 larshermges
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface UrlConfig {
  urls: string[];
}

export type Method = "json" | "sarif";

export interface ReporterConfig {
  reporters?: any[];
  [key: string]: any;
}

export interface Pa11yCiOptions {
  chromeLaunchConfig?: object;
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
  results: { [url: string]: any[] | Error[] };
}