#!/bin/bash

# Complete React Native iOS Reset Script
# Run this from your project root directory

echo "🔧 Starting complete React Native iOS reset..."

# Step 1: Clean up old files
echo "📦 Removing old build artifacts..."
cd ios
rm -rf Pods Podfile.lock build derived_data
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ..

# Step 2: Clear npm cache
echo "🗑️  Clearing npm/yarn cache..."
npm cache clean --force

# Step 3: Reinstall node modules
echo "📥 Reinstalling node modules..."
rm -rf node_modules
yarn install

# Step 4: Update cocoapods
echo "🔄 Updating CocoaPods..."
sudo gem install cocoapods
pod repo update

# Step 5: Reinstall pods with correct settings
echo "📦 Installing pods..."
cd ios

pod install --repo-update
cd ..

# Step 6: Clear Xcode cache
echo "🧹 Clearing Xcode cache..."
rm -rf ~/Library/Caches/com.apple.dt.Xcode
rm -rf ~/Library/Developer/Xcode/DerivedData/*

echo "✅ Reset complete!"
echo ""
echo "Next steps:"
echo "1. Open TappedN.xcworkspace (NOT .xcodeproj)"
echo "2. Select 'TappedN' target"
echo "3. Go to Build Settings"
echo "4. Search for 'CLANG_CXX_LANGUAGE_STANDARD'"
echo "5. Set it to empty string or remove it"
echo "6. Build: Product → Build (Cmd+B)"
