module.exports = {
  preset: 'react-native',
};

/*
abdurrafay@ABDURs-MacBook-Pro TappedN % yarn install
yarn install v1.22.22
warning ../../../../../package.json: No license field
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.35s.
abdurrafay@ABDURs-MacBook-Pro TappedN % cd android
./gradlew generateCodegenArtifactsFromSchema

> Configure project :notifee_react-native
:notifee_react-native @notifee/react-native found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native
:notifee_react-native package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native/package.json
:notifee_react-native:version set from package.json: 9.1.8 (9,1,8 - 9001008)
:notifee_react-native:android.compileSdk using custom value: 35
:notifee_react-native:android.targetSdk using custom value: 35
:notifee_react-native:android.minSdk using custom value: 24
:notifee_react-native:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_app
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_app:firebase.bom using default value: 33.12.0
:react-native-firebase_app:play.play-services-auth using default value: 21.3.0
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_app:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_app:android.compileSdk using custom value: 35
:react-native-firebase_app:android.targetSdk using custom value: 35
:react-native-firebase_app:android.minSdk using custom value: 24
:react-native-firebase_app:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_auth
:react-native-firebase_auth package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_auth:firebase.bom using default value: 33.12.0
:react-native-firebase_auth package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/package.json
:react-native-firebase_auth:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_auth:android.compileSdk using custom value: 35
:react-native-firebase_auth:android.targetSdk using custom value: 35
:react-native-firebase_auth:android.minSdk using custom value: 24
:react-native-firebase_auth:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_firestore
:react-native-firebase_firestore package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/firestore/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_firestore:firebase.bom using default value: 33.12.0
:react-native-firebase_firestore package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/firestore/package.json
:react-native-firebase_firestore:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_firestore:android.compileSdk using custom value: 35
:react-native-firebase_firestore:android.targetSdk using custom value: 35
:react-native-firebase_firestore:android.minSdk using custom value: 24
:react-native-firebase_firestore:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_messaging
:react-native-firebase_messaging package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/messaging/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_messaging:firebase.bom using default value: 33.12.0
:react-native-firebase_messaging package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/messaging/package.json
:react-native-firebase_messaging:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_messaging:android.compileSdk using custom value: 35
:react-native-firebase_messaging:android.targetSdk using custom value: 35
:react-native-firebase_messaging:android.minSdk using custom value: 24
:react-native-firebase_messaging:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_storage
:react-native-firebase_storage package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_storage:firebase.bom using default value: 33.12.0
:react-native-firebase_storage package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/package.json
:react-native-firebase_storage:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_storage:android.compileSdk using custom value: 35
:react-native-firebase_storage:android.targetSdk using custom value: 35
:react-native-firebase_storage:android.minSdk using custom value: 24
:react-native-firebase_storage:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

[Incubating] Problems report is available at: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/android/build/reports/problems/problems-report.html

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.14.1/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

BUILD SUCCESSFUL in 11s
28 actionable tasks: 18 executed, 10 up-to-date
abdurrafay@ABDURs-MacBook-Pro android % ./gradlew assembleDebug

> Configure project :notifee_react-native
:notifee_react-native @notifee/react-native found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native
:notifee_react-native package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native/package.json
:notifee_react-native:version set from package.json: 9.1.8 (9,1,8 - 9001008)
:notifee_react-native:android.compileSdk using custom value: 35
:notifee_react-native:android.targetSdk using custom value: 35
:notifee_react-native:android.minSdk using custom value: 24
:notifee_react-native:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_app
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_app:firebase.bom using default value: 33.12.0
:react-native-firebase_app:play.play-services-auth using default value: 21.3.0
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_app:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_app:android.compileSdk using custom value: 35
:react-native-firebase_app:android.targetSdk using custom value: 35
:react-native-firebase_app:android.minSdk using custom value: 24
:react-native-firebase_app:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_auth
:react-native-firebase_auth package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_auth:firebase.bom using default value: 33.12.0
:react-native-firebase_auth package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/package.json
:react-native-firebase_auth:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_auth:android.compileSdk using custom value: 35
:react-native-firebase_auth:android.targetSdk using custom value: 35
:react-native-firebase_auth:android.minSdk using custom value: 24
:react-native-firebase_auth:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_firestore
:react-native-firebase_firestore package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/firestore/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_firestore:firebase.bom using default value: 33.12.0
:react-native-firebase_firestore package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/firestore/package.json
:react-native-firebase_firestore:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_firestore:android.compileSdk using custom value: 35
:react-native-firebase_firestore:android.targetSdk using custom value: 35
:react-native-firebase_firestore:android.minSdk using custom value: 24
:react-native-firebase_firestore:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_messaging
:react-native-firebase_messaging package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/messaging/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_messaging:firebase.bom using default value: 33.12.0
:react-native-firebase_messaging package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/messaging/package.json
:react-native-firebase_messaging:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_messaging:android.compileSdk using custom value: 35
:react-native-firebase_messaging:android.targetSdk using custom value: 35
:react-native-firebase_messaging:android.minSdk using custom value: 24
:react-native-firebase_messaging:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Configure project :react-native-firebase_storage
:react-native-firebase_storage package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/package.json
:react-native-firebase_app package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_storage:firebase.bom using default value: 33.12.0
:react-native-firebase_storage package.json found at /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/package.json
:react-native-firebase_storage:version set from package.json: 21.14.0 (21,14,0 - 21014000)
:react-native-firebase_storage:android.compileSdk using custom value: 35
:react-native-firebase_storage:android.targetSdk using custom value: 35
:react-native-firebase_storage:android.minSdk using custom value: 24
:react-native-firebase_storage:reactNativeAndroidDir /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native

> Task :notifee_react-native:processDebugManifest
package="io.invertase.notifee" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.invertase.notifee" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native/android/src/main/AndroidManifest.xml.

> Task :react-native-firebase_firestore:processDebugManifest
package="io.invertase.firebase.firestore" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/firestore/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.invertase.firebase.firestore" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/firestore/android/src/main/AndroidManifest.xml.

> Task :react-native-firebase_app:processDebugManifest
package="io.invertase.firebase" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.invertase.firebase" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/app/android/src/main/AndroidManifest.xml.

> Task :react-native-firebase_auth:processDebugManifest
package="io.invertase.firebase.auth" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.invertase.firebase.auth" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/android/src/main/AndroidManifest.xml.

> Task :react-native-geolocation-service:processDebugManifest
package="com.agontuk.RNFusedLocation" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-geolocation-service/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.agontuk.RNFusedLocation" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-geolocation-service/android/src/main/AndroidManifest.xml.

> Task :react-native-firebase_storage:processDebugManifest
package="io.invertase.firebase.storage" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.invertase.firebase.storage" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/android/src/main/AndroidManifest.xml.

> Task :react-native-image-picker:processDebugManifest
package="com.imagepicker" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-image-picker/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.imagepicker" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-image-picker/android/src/main/AndroidManifest.xml.

> Task :react-native-firebase_messaging:processDebugManifest
package="io.invertase.firebase.messaging" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/messaging/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.invertase.firebase.messaging" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/messaging/android/src/main/AndroidManifest.xml.

> Task :react-native-safe-area-context:processDebugManifest
package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.

> Task :react-native-worklets:compileDebugJavaWithJavac
Note: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-worklets/android/src/main/java/com/swmansion/worklets/WorkletsMessageQueueThreadBase.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-worklets/android/src/main/java/com/swmansion/worklets/WorkletsPackage.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :notifee_react-native:compileDebugJavaWithJavac
/Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@notifee/react-native/android/src/main/java/io/invertase/notifee/NotifeeApiModule.java:42: warning: [removal] onCatalystInstanceDestroy() in NativeModule has been deprecated and marked for removal
  public void onCatalystInstanceDestroy() {
              ^

> Task :react-native-geolocation-service:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-image-picker:compileDebugJavaWithJavac
Note: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-image-picker/android/src/main/java/com/imagepicker/ImagePickerPackage.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :notifee_react-native:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
1 warning

> Task :react-native-firebase_app:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-masked-view_masked-view:compileDebugJavaWithJavac
Note: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-masked-view/masked-view/android/src/main/java/org/reactnative/maskedview/RNCMaskedViewPackage.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-reanimated:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-firebase_messaging:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-firebase_auth:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/auth/android/src/main/java/io/invertase/firebase/auth/ReactNativeFirebaseAuthModule.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-firebase_storage:compileDebugJavaWithJavac
Note: /Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/@react-native-firebase/storage/android/src/main/java/io/invertase/firebase/storage/ReactNativeFirebaseStoragePackage.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-firebase_firestore:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-svg:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :react-native-community_datetimepicker:compileDebugJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :react-native-pager-view:compileDebugKotlin
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:10:8 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:41:19 'fun receiveCommand(view: NestedScrollableHost, commandName: String, args: ReadableArray?): Unit' is deprecated. args is not nullable, please update your method signature.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:91:26 The corresponding parameter in the supertype 'PagerViewViewManager' is named 'parent'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:204:16 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:205:45 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:206:57 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/fabric/java/com/reactnativepagerview/PagerViewViewManager.kt:207:47 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/PagerViewViewPackage.kt:10:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollEvent.kt:6:8 'interface RCTEventEmitter : JavaScriptModule' is deprecated. Use [RCTModernEventEmitter] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollEvent.kt:21:82 'constructor<T : Event<T>>(viewTag: Int): Event<T>' is deprecated. Use constructor with explicit surfaceId instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollEvent.kt:27:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollEvent.kt:27:44 'interface RCTEventEmitter : JavaScriptModule' is deprecated. Use [RCTModernEventEmitter] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollEvent.kt:28:25 'fun receiveEvent(targetTag: Int, eventName: String, params: WritableMap?): Unit' is deprecated. Use [RCTModernEventEmitter.receiveEvent] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollStateChangedEvent.kt:6:8 'interface RCTEventEmitter : JavaScriptModule' is deprecated. Use [RCTModernEventEmitter] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollStateChangedEvent.kt:15:89 'constructor<T : Event<T>>(viewTag: Int): Event<T>' is deprecated. Use constructor with explicit surfaceId instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollStateChangedEvent.kt:20:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollStateChangedEvent.kt:20:44 'interface RCTEventEmitter : JavaScriptModule' is deprecated. Use [RCTModernEventEmitter] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageScrollStateChangedEvent.kt:21:25 'fun receiveEvent(targetTag: Int, eventName: String, params: WritableMap?): Unit' is deprecated. Use [RCTModernEventEmitter.receiveEvent] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageSelectedEvent.kt:6:8 'interface RCTEventEmitter : JavaScriptModule' is deprecated. Use [RCTModernEventEmitter] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageSelectedEvent.kt:15:69 'constructor<T : Event<T>>(viewTag: Int): Event<T>' is deprecated. Use constructor with explicit surfaceId instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageSelectedEvent.kt:24:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageSelectedEvent.kt:24:44 'interface RCTEventEmitter : JavaScriptModule' is deprecated. Use [RCTModernEventEmitter] instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-pager-view/android/src/main/java/com/reactnativepagerview/event/PageSelectedEvent.kt:25:25 'fun receiveEvent(targetTag: Int, eventName: String, params: WritableMap?): Unit' is deprecated. Use [RCTModernEventEmitter.receiveEvent] instead.

> Task :react-native-safe-area-context:compileDebugKotlin
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:9:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:50:54 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewShadowNode.kt:9:32 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewShadowNode.kt:110:61 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.

> Task :app:checkDebugAarMetadata FAILED

> Task :react-native-gesture-handler:compileDebugKotlin
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/Extensions.kt:8:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/Extensions.kt:13:29 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/Extensions.kt:14:32 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerModule.kt:173:53 This synthetic property is based on the getter function 'fun getRootViewTag(): Int' from Kotlin. In the future, synthetic properties will be available only if the base getter function came from Java. Consider replacing this property access with a 'getRootViewTag()' function call.

> Task :react-native-screens:compileDebugKotlin
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:62:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'name'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:63:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'reactContext'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:76:17 'constructor(name: String, className: String, canOverrideExistingModule: Boolean, needsEagerInit: Boolean, hasConstants: Boolean, isCxxModule: Boolean, isTurboModule: Boolean): ReactModuleInfo' is deprecated. This constructor is deprecated and will be removed in the future. Use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)].
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:26:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:56:77 Unchecked cast of '(CoordinatorLayout.Behavior<View!>?..CoordinatorLayout.Behavior<*>?)' to 'BottomSheetBehavior<Screen>'.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:428:42 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:6:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:56:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:222:31 'var targetElevation: Float' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:225:13 'fun setHasOptionsMenu(p0: Boolean): Unit' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:404:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:411:22 'fun onPrepareOptionsMenu(p0: Menu): Unit' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:414:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:419:22 'fun onCreateOptionsMenu(p0: Menu, p1: MenuInflater): Unit' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:441:22 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigShadowNode.kt:4:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigShadowNode.kt:10:5 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:9:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:37:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:6:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:65:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:48:42 'fun replaceSystemWindowInsets(p0: Int, p1: Int, p2: Int, p3: Int): @NonNull() WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:49:39 'val systemWindowInsetLeft: Int' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:51:39 'val systemWindowInsetRight: Int' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:52:39 'val systemWindowInsetBottom: Int' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:4:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:5:8 'class NativeViewHierarchyManager : Any' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:6:8 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:7:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:11:5 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:12:63 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:14:34 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:14:106 'class NativeViewHierarchyManager : Any' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:7:8 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:25:13 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:32:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'left'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:33:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'top'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:34:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'right'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:35:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'bottom'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:71:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:72:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:79:46 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:83:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:84:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:95:34 The corresponding parameter in the supertype 'RootView' is named 't'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:64:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:65:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:69:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:70:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/gamma/tabs/TabsHostViewManager.kt:37:9 The corresponding parameter in the supertype 'TabsHostViewManager' is named 'view'. This may cause problems when calling this function with named arguments.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:19:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:153:45 'fun consumeDisplayCutout(): @NonNull() WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:194:58 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:201:31 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:7:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:8:8 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:14:32 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:83:63 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.

[Incubating] Problems report is available at: file:///Users/abdurrafay/Documents/Wasay/ReactNative/Projects/TappedN/android/build/reports/problems/problems-report.html

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugAarMetadata'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckAarMetadataWorkAction
   > 2 issues were found when checking AAR metadata:
     
       1.  Dependency 'androidx.core:core:1.17.0' requires libraries and applications that
           depend on it to compile against version 36 or later of the
           Android APIs.
     
           :app is currently compiled against android-35.
     
           Recommended action: Update this project to use a newer compileSdk
           of at least 36, for example 36.
     
           Note that updating a library or application's compileSdk (which
           allows newer APIs to be used) can be done separately from updating
           targetSdk (which opts the app in to new runtime behavior) and
           minSdk (which determines which devices the app can be installed
           on).
     
       2.  Dependency 'androidx.core:core-ktx:1.17.0' requires libraries and applications that
           depend on it to compile against version 36 or later of the
           Android APIs.
     
           :app is currently compiled against android-35.
     
           Recommended action: Update this project to use a newer compileSdk
           of at least 36, for example 36.
     
           Note that updating a library or application's compileSdk (which
           allows newer APIs to be used) can be done separately from updating
           targetSdk (which opts the app in to new runtime behavior) and
           minSdk (which determines which devices the app can be installed
           on).

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.14.1/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

BUILD FAILED in 3m 32s
369 actionable tasks: 273 executed, 68 from cache, 28 up-to-date
abdurrafay@ABDURs-MacBook-Pro android % 
 */