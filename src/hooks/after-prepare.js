var fs = require('fs');
var AndroidManifest = require('androidmanifest');
var iOSPList = require('plist');

module.exports = function(hookArgs, $projectData) {
  console.log("******************************** DEV VERSION PREPARE START ********************************");
  
  var appPackage = $projectData.packageJsonData.nativescript;
  var appVersion = appPackage.version;
  let appVersionNumber = appPackage.versionNumber;
  if (!appVersion) {
    console.warn(
      'Nativescript version is not defined. Skipping set native package version.'
    );
    return;
  }
  console.log("******************************** appVersion: "+appVersion+" appVersionNumber: "+appVersionNumber+" ********************************");

  var platformsData = getPlatformsData($injector);
  var platform = (
    hookArgs.platform ||
    (hookArgs.prepareData && hookArgs.prepareData.platform)
  ).toLowerCase();
  console.info(`Platform: ${platform}`);

  var platformData = platformsData.getPlatformData(platform);
  console.info(
    `platformData.configurationFilePath: ${platformData.configurationFilePath}`
  );
  if (platform == 'android') {
    var manifest = new AndroidManifest().readFile(
      platformData.configurationFilePath
    );

    // transforms e.g. "1.2.3" into 102003.
    let versionCode = appVersion
      .split('.')
      .reduce(
        (acc, v, i, a) => acc + v * Math.pow(10, (a.length - i - 1) * 2),
        0
      );

    if (appVersionNumber) {
      versionCode =
        versionCode * 100 +
        (appVersionNumber < 10 ? '0' : '') + // left pad appVersionNumber
        appVersionNumber;
    }

    manifest.$('manifest').attr('android:versionCode', versionCode);
    manifest.$('manifest').attr('android:versionName', appVersion);
    manifest.writeFile(platformData.configurationFilePath);
  } else if (platform == 'ios') {
    var plist = iOSPList.parse(
      fs.readFileSync(platformData.configurationFilePath, 'utf8')
    );
    plist.CFBundleShortVersionString = appVersion;
    plist.CFBundleVersion = appVersionNumber;
    fs.writeFileSync(platformData.configurationFilePath, iOSPList.build(plist));
  }
};

function getPlatformsData($injector) {
  try {
    return $injector.resolve('platformsData');
  } catch (err) {
    return $injector.resolve('platformsDataService');
  }
}
