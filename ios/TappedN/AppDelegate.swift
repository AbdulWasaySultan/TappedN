// import UIKit
// import React
// import React_RCTAppDelegate
// import FirebaseCore

// // Note: If RCTAppDependencyProvider is not found, ensure it's in your bridging header 
// // or available via the React_RCTAppDelegate module.
// import ReactAppDependencyProvider 

// @main
// class AppDelegate: RCTAppDelegate {

//   override func application(
//     _ application: UIApplication,
//     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
//   ) -> Bool {
    
//     // 1. Initialize Firebase first
//     FirebaseApp.configure()

//     // 2. Set the Module Name (must match your package.json 'name')
//     self.moduleName = "TappedN"
    
//     // 3. Set the Dependency Provider 
//     // This is the bridge between the New Arch and your app
//     self.dependencyProvider = RCTAppDependencyProvider()

//     // 4. Set the initial props (optional)
//     self.initialProps = [:]

//     return super.application(application, didFinishLaunchingWithOptions: launchOptions)
//   }

//   // MARK: - Bundle URL Configuration
  
//   override func sourceURL(for bridge: RCTBridge) -> URL? {
//     return self.bundleURL()
//   }

//   override func bundleURL() -> URL? {
// #if DEBUG
//     return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
// #else
//     return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
// #endif
//   }

//   // Required for New Architecture / Concurrent Root
//   override func recreateRootView(with bundleURL: URL!, moduleName: String!, initialProperties: [AnyHashable : Any]!, launchOptions: [AnyHashable : Any]!) -> UIView! {
//     return super.recreateRootView(with: bundleURL, moduleName: moduleName, initialProperties: initialProperties, launchOptions: launchOptions)
//   }
// }


import UIKit
import React_RCTAppDelegate
import ReactAppDependencyProvider // 👈 Crucial for 0.83+ performance
import FirebaseCore

@main
class AppDelegate: RCTAppDelegate {

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    
    // Initialize Firebase
    FirebaseApp.configure()

    // ⚡️ LIGHTNING UPGRADE: Set the Dependency Provider
    // This removes the need for your manual singleton checks.
    // It tells React Native how to find TurboModules instantly.
    self.dependencyProvider = RCTAppDependencyProvider()

    self.moduleName = "TappedN"
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  // MARK: - Bundle URL Configuration
  
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    return self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
