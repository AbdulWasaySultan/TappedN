# ⚡ Quick Setup Guide - Service Provider Messaging

## What's Done ✅

All the backend code is ready. The app now:
1. Fetches service providers from your API on startup
2. Stores them in Redux for instant access
3. Shows provider details in chat header
4. Uses Firestore for real-time messages (unchanged)

## Your Task (5 minutes) 📋

Go to **mocki.io** and update your API response to include a `providers` array.

### Current Structure (Example):
```json
{
  "data": {
    "outlets": [...],
    "success": true
  }
}
```

### Update To:
```json
{
  "data": {
    "outlets": [...],
    "providers": [
      {
        "uid": "provider_001",
        "name": "Malik Ahmed",
        "profileImage": "https://example.com/malik.jpg",
        "outletName": "Elite Salon"
      },
      {
        "uid": "provider_002", 
        "name": "Fatima Khan",
        "profileImage": "https://example.com/fatima.jpg",
        "outletName": "Beauty Studio"
      }
    ],
    "success": true
  }
}
```

**Required fields in each provider:**
- `uid` - Unique ID (string)
- `name` - Provider name
- `profileImage` - Photo URL
- `outletName` - (Optional) Salon name

---

## Code Locations

| What | Where |
|------|-------|
| Redux state | `src/redux/serviceProviderSlice.ts` |
| API fetch | `src/API/api.tsx` → `fetchServiceProvidersFromAPI()` |
| Hook | `src/Context/useServiceProviders.ts` |
| Chat screen | `src/screens/BottomTabNavigator/Settings/MessagingScreen.tsx` |
| Navigation types | `src/Navigation/navigation.ts` |

---

## How to Use in Your Code

When user opens chat with provider:

```typescript
const { getProviderById } = useServiceProviders();

// Get provider from Redux cache
const provider = getProviderById(providerId);

if (provider) {
  // Use provider data
  navigation.navigate('MessagingScreen', {
    chatId: 'chat_123',
    otherUser: {
      uid: provider.uid,
      name: provider.name,
      profileImage: provider.profileImage,
      outletName: provider.outletName,
    }
  });
}
```

---

## What Happens

1. ✅ App starts → Fetches providers from API
2. ✅ Providers stored in Redux
3. ✅ When messaging → Gets provider from cache
4. ✅ Messages sync via Firestore (real-time)
5. ✅ Provider header shows name + image

---

## Testing

After updating the API:
1. Restart the app
2. Open DevTools and check Redux state
3. You should see providers array populated
4. Try opening a chat with a provider
5. Header should show provider info

---

## Questions?

The implementation is intentionally minimal. All code is working and ready to use once you add the providers array to your API response.
