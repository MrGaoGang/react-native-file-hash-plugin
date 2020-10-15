import path from "path";

export interface Config {
  // the file type to hash
  types: Array<string>;
  // the input params is file name and file path; the output is hash string
  hashFunction?: (fileName: string, path: string) => string;
  // the  ignore file path regex
  ignoreRegex: RegExp | null;
  // the react-native bundle '--assets-dest' path ,default will read by process.args
  outputPath?: string;
  // external object to asset
  externalOptions?: (fileName: string, path: string) => object;
}

const defaultConfig: Config = {
  types: ["png", "jpeg", "jpg", "gif"],
  ignoreRegex: null,
};

function isPromise(obj: any) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

export async function load(): Promise<Config> {
  const metroConfigPath = path.join(process.cwd(), "metro.config.js");

  let metroConfig;
  try {
    const config = require(metroConfigPath);
    if (isPromise(config)) {
      metroConfig = await config;
    } else if (typeof config === "function") {
      metroConfig = config;
    } else {
      metroConfig = config;
    }
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
