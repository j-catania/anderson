import { readFile } from 'node:fs/promises';

/**
 * Get config file
 * @param path
 * @returns {ConfigFile}
 */
const get = async (path) => {
  try {
    const cfg = await readFile(path, 'utf-8');

    return JSON.parse(cfg);
  } catch (e) {
    throw new Error(`Error reading config file: ${e.message}`);
  }
};

const ConfigService = {
  get,
};

export default ConfigService;
