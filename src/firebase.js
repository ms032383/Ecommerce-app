import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBPjJDmuCUmzjWhDgWRrMzeUBc8CodkhKY",
  authDomain: "pattu-sarees-by-naveena.firebaseapp.com",
  projectId: "pattu-sarees-by-naveena",
  storageBucket: "pattu-sarees-by-naveena.appspot.com",
  messagingSenderId: "166584656723",
  appId: "1:166584656723:web:cbcaf6dd74a146776e37a6",
  measurementId: "G-2SB23JH29V"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BLjskxxEbs3ehtosWqV7-LuSedXkY91rem83K3BivQysCpFDW7BZP2FkdBwUyszcZw_NDr2iQwmWEqmKZOtKsVU",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
