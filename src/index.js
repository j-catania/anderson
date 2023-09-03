#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import fetch from 'node-fetch';
import ConfigService from './services/ConfigService.js';

const require = createRequire(import.meta.url);
const { name, description, version } = require('../package.json');

const program = new Command();

/**
 * @type {number[]}
 */
const intervals = [];
/**
 * @type {ServiceStatus[]}
 */
const serviceStatuses = [];

program
  .name(name)
  .description(description)
  .version(version)
  .option('-f, --config-file <confFile>', 'Config file', './emusk.json')
  .action(async (opts) => {
    const config = await ConfigService.get(opts.configFile);
    config.services.forEach((service) => {
      /**
       * @type {ServiceStatus}
       */
      const status = {
        name: service.name, service, status: 'unknown', date: new Date(),
      };
      serviceStatuses.push(status);

      const inter = setInterval(async () => {
        const url = `${(service.secure ?? true) ? 'https' : 'http'}://${service.host}${service.port ? `:${service.port}` : ''}${service.path ?? ''}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
        }, service.timeout ?? 1000);
        try {
          const resp = await fetch(url, { method: service.method ?? 'GET', signal: controller.signal });
          if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
          }
          status.status = 'up';
          status.message = undefined;
        } catch (error) {
          status.status = 'down';
          status.message = `'${service.name}' ${error.message}`;
        } finally {
          status.date = new Date();
          clearTimeout(timeout);
        }
      }, service.interval ?? 5000);
      intervals.push(inter);
    });
  });

program.parse();

setInterval(() => {
  console.log(serviceStatuses);
}, 1000);
