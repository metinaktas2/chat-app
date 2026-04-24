# 💬 Chat App

A fully **responsive real-time chat application** built with modern web technologies. Users can securely log in with email verification, join chat rooms, and communicate seamlessly with others.

## 🚀 Technologies Used

* React
* react-router-dom
* Firebase
* Tailwind CSS
* react-toastify

## 📌 Features

* 🔐 **Email Authentication:** Secure login with email verification.
* 💬 **Chat Rooms:** Users can join chat rooms by entering a room name.
* 🔄 **Switch Between Rooms:** Easily leave a room and join another.
* 👥 **Multi-User Support:** Multiple users can join the same room from different email accounts.
* ⚡ **Real-Time Messaging:** Instant message updates using Firebase.
* 🎨 **User-Friendly UI:** Clean and modern interface with Tailwind CSS.
* 📱 **Responsive Design:** Works smoothly on mobile, tablet, and desktop devices.
* 🔔 **Notifications:** User feedback with toast notifications.

## 🎬 Preview

Below is a GIF showcasing the project:

![Project Preview](./path-to-your-gif.gif)

> Note: Replace the GIF path with your actual file location.

## ⚙️ Installation

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
npm install
npm start
```

## 🔥 Firebase Setup

1. Go to Firebase Console and create a new project
2. Enable Authentication (Email/Password)
3. Create a Firestore Database
4. Add your Firebase config to the project

```js
// firebaseConfig.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 📂 Project Structure (Optional)

```bash
src/
│── components/
│── pages/
│── firebase/
│── styles/
```

## 📎 Future Improvements

* Typing indicator
* Message timestamps
* Private messaging
* Dark mode

## 🧑‍💻 Author

Developed by **[Your Name]**

---

⭐ If you like this project, don’t forget to star the repository!
