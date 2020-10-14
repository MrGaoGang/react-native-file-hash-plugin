import path from "path";

export interface Config {
  // the file type to hash
  types: Array<string>;
  // the input params is file name and file path; the output is hash string
  hashFunction?: (fileName: string, path: string ) => string;
  // the  ignore file path regex
  ignoreRegex: RegExp | null;
  // the react-native bundle '--assets-dest' path ,default will read by process.args
  outputPath?: string;
}

const defaultConfig: Config = {
  types: ["png", "jpeg", "jpg", "gif"],
  ignoreRegex: null,
};

export async function load(): Promise<Config> {
  const metroConfigPath = path.join(process.cwd(), "metro.config.js");

  let metroConfig;
  try {
    metroConfig = require(metroConfigPath);
  } catch {
    metroConfig = {};
  }

  const transformerOptions = metroConfig.transformer || {};
  const fileHashPluginOptions = transformerOptions.fileHashPlugin || {};

  const config = {
    ...defaultConfig,
    ...fileHashPluginOptions,
  };

  return config;
}
