import { readFile } from 'node:fs/promises';

/**
 * Get config file
 * @param path
 * @returns {ConfigFile}
 */
const get = async (path) => JSON.parse(await readFile(path, 'utf-8'));

const ConfigService = {
  get,
};

export default ConfigService;
