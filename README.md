Nativescript hook plugin to maintain native app version
=======================================================

This plugin just takes the `nativescript.version` property from `package.json` and puts on the specific platform resources: `AndroidManifest.xml` file for the Android sources, and `Info.plist` for iOS sources.

How to use
----------
```
$ tns plugin add nativescript-dev-version-ssi
```

This forked version of nativescript-dev-version will expand the version number into a version code that increments properly.  XYYYZZZZ is generated as the version code from version X.Y.Z.  For example, 1.2.3 becomes 10020003

The above command installs this module and installs the necessary NativeScript hooks.

Then, specify and maintain the desired release version on the `package.json` file under the `nativescript.version` property, for example:

```json
{
  "nativescript": {
    "id": "org.nativescript.MySampleApp",
    "version": "1.2.3"
    ...
  },
  ...
}
```

When running `tns prepare ...` the hooks will take care of the native resources, and your app will get the `1.2.3` version number!

