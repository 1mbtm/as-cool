# 🔥 Firebase setup (login + selfies ke liye)

`/students-selfies` page login (Google + email) aur ek chhota database use karta hai.
Bina Firebase ke baaki site chalti hai — bas selfie feature "setup pending" dikhayega.

## 1. Project banao
1. https://console.firebase.google.com → **Add project**
2. Project ban jaane ke baad, ⚙️ **Project settings** → **Your apps** → **Web (`</>`)** → register app
3. Jo `firebaseConfig` object dikhta hai, uske values copy karo

## 2. `.env` file banao
Root me `.env.example` ko copy karke `.env` banao aur values bharo:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc123
```

> `.env` commit mat karna — already `.gitignore` me hai. Change ke baad **dev server restart** karo.

## 3. Auth on karo
Firebase console → **Build → Authentication → Get started → Sign-in method**:
- **Google** enable karo
- **Email/Password** enable karo

## 4. Firestore banao
Firebase console → **Build → Firestore Database → Create database** (production mode).

Phir **Rules** tab me yeh paste karke **Publish** karo:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ek student = ek selfie (doc id = user ki uid)
    match /selfies/{uid} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null
                            && request.auth.uid == uid
                            && request.resource.data.uid == uid;
      allow delete: if false;
    }
  }
}
```

Bas! Ab `/students-selfies` pe login karke selfie upload ho jayegi.

## Notes
- **Selfies base64 (compact JPEG) ke roop me Firestore me store hoti hain** — free (Spark) plan pe kaam karta hai, koi billing/Storage setup nahi chahiye. Image client-side ~480px tak downscale hoti hai (`src/lib/image.js`).
- Firebase Storage use karna ho (bade images) to `src/pages/Selfies.jsx` ka upload part badalna padega.
- Poll (`/poll`) Firebase use **nahi** karta — votes localStorage me hain, password `src/config.js` me (`SITE.pollPassword`).
