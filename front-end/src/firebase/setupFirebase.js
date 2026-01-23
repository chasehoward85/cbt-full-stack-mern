import { initializeApp } from "firebase/app";

export const setupFirebase = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyAgU6-71wzmwQzzewJ4JK7xuNzxE3KcIzw",
		authDomain: "note-sharing-app-6a8cb.firebaseapp.com",
		projectId: "note-sharing-app-6a8cb",
		storageBucket: "note-sharing-app-6a8cb.firebasestorage.app",
		messagingSenderId: "770474618336",
		appId: "1:770474618336:web:15a11fbbcb0c6a6871cf85"
	};

	initializeApp(firebaseConfig);
}
