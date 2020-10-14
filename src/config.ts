import path from "path";

export interface Config {
  // the image type to hash
  types: Array<string>;
  // the input params is image name and file path; the output is hash string
  hashFunction?: (imageName: string, path: string ) => string;
  // the  ignore image path regex
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
  const imageHashPluginOptions = transformerOptions.imageHashPlugin || {};

  const config = {
    ...defaultConfig,
    ...imageHashPluginOptions,
  };

  return config;
}
