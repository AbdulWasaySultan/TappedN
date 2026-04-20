# Navigation Structure Documentation

## Overview
Your app navigation is now organized into 4 separate stack navigators for better code organization and maintainability.

## Navigation Stacks

### 1. **RootStack** (`src/Navigation/RootStack.tsx`)
- **Purpose**: Main entry point that handles authentication state
- **Screens**:
  - `Splash` - Initial loading screen
  - `AuthStack` - Shows when user is NOT authenticated
  - `HomeStack` - Shows when user IS authenticated
- **Key Feature**: Manages conditional rendering based on authentication status

### 2. **AuthStack** (`src/Navigation/AuthStack.tsx`)
- **Purpose**: All authentication-related screens
- **Screens**:
  - `Login` - User login
  - `Register` - New account registration
  - `ForgotPassword` - Password recovery initiation
  - `ResetPassword` - Password reset with email token
  - `OTP` - One-time password verification

### 3. **HomeStack** (`src/Navigation/HomeStack.tsx`)
- **Purpose**: User settings and profile management screens
- **Screens**:
  - `HomeTabs` - Main tab navigation (dashboard)
  - `ServiceStack` - Navigation to service browsing
  - `ChangePassword` - Settings screen to change password
  - `ProfileSettings` - User profile edit
  - `PrivacyPolicy` - Privacy policy display
  - `Subscription` - Subscription management
  - `MessagingScreen` - Chat with service provider

### 4. **ServiceStack** (`src/Navigation/ServiceStack.tsx`) ⭐ NEW
- **Purpose**: Service browsing, discovery, and booking flows
- **Screens**:
  - `Home` - Service home page
  - `Filters` - Service filtering options
  - `Handyman`, `Estheticians`, `MusicStudio`, `Barbers`, `Yoga`, `HairTreatment` - Service categories
  - `ViewAll` - View all services
  - `MyReview` - User reviews
  - `ServiceDetails` - Detailed service information
  - `BookAppointment` - Booking workflow
  - `AppointmentConfirmed` - Confirmation screen
  - `MyTabs` - Service provider tabs (Services, Business Info, Reviews)

## App Structure

### Before (Monolithic)
```
App.tsx
└── NavigationContainer
    └── Stack.Navigator (30+ screens mixed)
        ├── Login
        ├── Home
        ├── Handyman
        ├── ...all screens
        └── MessagingScreen
```

### After (Modular)
```
App.tsx
└── NavigationContainer
    └── RootNavigator
        ├── AuthStack (if not logged in)
        │   ├── Login
        │   ├── Register
        │   ├── ForgotPassword
        │   ├── ResetPassword
        │   └── OTP
        └── HomeStack (if logged in)
            ├── HomeTabs
            ├── ServiceStack
            │   ├── Home
            │   ├── Filters
            │   ├── Handyman
            │   ├── ...service categories
            │   ├── ServiceDetails
            │   ├── BookAppointment
            │   └── AppointmentConfirmed
            ├── ProfileSettings
            ├── ChangePassword
            ├── PrivacyPolicy
            ├── Subscription
            └── MessagingScreen
```

## Benefits

✅ **Cleaner Code** - Each stack manages related screens  
✅ **Better Organization** - Clear separation of concerns  
✅ **Easier Maintenance** - Find screens faster  
✅ **Scalability** - Easy to add more stacks  
✅ **Simplified App.tsx** - Reduced from ~170 lines to ~20 lines  
✅ **Proper Auth Flow** - Authentication state properly managed  

## How to Navigate Between Screens

### Within Same Stack (e.g., ServiceStack)
```javascript
navigation.navigate('ServiceDetails', { outletId: '123', serviceId: '456' });
```

### Between Stacks (e.g., HomeTabs → ServiceStack)
```javascript
// From HomeTabs to Service browsing
navigation.navigate('ServiceStack');

// Reset to home after booking
navigation.navigate('HomeStack');
```

### Authentication Check
When user logs in, update the authentication state in `RootStack.tsx` to automatically transition from `AuthStack` → `HomeStack`.

## Next Steps

1. **Connect Authentication**: Update the auth check logic in `RootStack.tsx` to use your actual auth provider (Redux, Context API, or AsyncStorage)

2. **Deep Linking**: Update deep link configuration to route through the new stack structure

3. **Type Safety**: Run TypeScript compiler to ensure all types are correct:
   ```bash
   npx tsc --noEmit
   ```

4. **Testing**: Test navigation flows:
   - Login flow (AuthStack)
   - Service browsing (ServiceStack within HomeStack)
   - Settings access (HomeStack screens)
