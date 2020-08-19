# Nativescript hook plugin to maintain native app version

This plugin takes the `version` and `versionNumber` properties from `package.json` and puts on the specific platform resources: `AndroidManifest.xml` file for the Android sources, and `Info.plist` for iOS sources.

Compatible with NS 6.

## How to use

```
$ tns plugin add nativescript-dev-version-ssi
```

This forked version of nativescript-dev-version will expand the version number into a version code that increments properly.  XYYYZZZZ is generated as the version code from version X.Y.Z.  For example, 1.2.3 becomes 10020003

The above command installs this module and installs the necessary NativeScript hooks.

Then, specify and maintain the desired release version on the `./package.json` file under the `nativescript.version` property, for example:

```json
{
  "nativescript": {
    "id": "org.nativescript.MySampleApp",
    "version": "1.2.3",
    "versionNumber": "1"
    ...
  },
  ...
}
```

or:

```json
{
  "version": "1.2.3",
  "versionNumber": "1"
  ...
}
```

When running `tns prepare ...` the hooks will take care of the native resources.

On iOS, your `Info.plist` will get:

```
<key>CFBundleShortVersionString</key>
<string>1.2.3</string>
<key>CFBundleVersion</key>
<string>1</string>
```

On Android, `AndroidManifest.xml` will have:

```
<manifest
  (...) android:versionCode="10203001" android:versionName="1.2.3"
```

## Breaking changes

When upgading to v0.1.3, for iOS you MUST add "versionNumber": "[value]" to correctly apply on <key>CFBundleVersion</key> in the `Info.plist`

