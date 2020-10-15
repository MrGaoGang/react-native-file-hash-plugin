import { AssetData, AssetDataPlugin } from "./module";
import { load, Config } from "./config";
const asyncLoadConfig: Promise<Config> = load();
async function reactNativeFileHashPlugin(assetData: AssetData) {
  const filePath = assetData.files.length ? assetData.files[0] : "";
  if (await shouldConvertFile(assetData, filePath)) {
    return createfileHash(assetData, filePath);
  }
  return assetData;
}

async function shouldConvertFile(
  assetData: AssetData,
  filePath: string
): Promise<boolean> {
  const allTypes = (await asyncLoadConfig).types;
  const ignoreRegex = (await asyncLoadConfig).ignoreRegex;
  if (ignoreRegex && ignoreRegex.test(filePath)) {
    return false;
  }
  if (allTypes.indexOf(assetData.type) === -1) {
    return false;
  }
  return true;
}

async function createfileHash(assetData: AssetData, filePath: string) {
  if (assetData.files.length === 0) {
    throw new Error("No files passed.");
  } else if (assetData.files.length > 1) {
    throw new Error("Multiple file  not supported.");
  }
  const config = await asyncLoadConfig;

  let useHash: string = "";
  if (config.hashFunction) {
    useHash = config.hashFunction.call(
      assetData,
      `${assetData.name}.${assetData.type}`,
      filePath
    );
  }
  const outputName = `${assetData.name}-${
    useHash != "" ? useHash : assetData.hash
  }`;
  //   const outputPath = config.outputPath ? config.outputPath : getAssetDest();
  let externalOptions = config.externalOptions
    ? config.externalOptions.call(
        assetData,
        `${assetData.name}.${assetData.type}`,
        filePath
      )
    : {};
  if (Object.prototype.toString.call(externalOptions) !== "[object Object]") {
    externalOptions = {};
  }
  return {
    ...assetData,
    name: outputName,
    ...externalOptions
  };
}

function getAssetDest(): string {
  const args = process.argv;
  if (args.indexOf("--assets-dest") != -1) {
    return args[args.indexOf("--assets-dest") + 1];
  }
  return "";
}
export default reactNativeFileHashPlugin;
module.exports = reactNativeFileHashPlugin;
