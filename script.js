// Firebase v9+ Modular imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDzIxlqNCP1CD1EFnaVxkDfl8Y5vfgngeo",
  authDomain: "smart-lecture-149cf.firebaseapp.com",
  projectId: "smart-lecture-149cf",
  storageBucket: "smart-lecture-149cf.appspot.com",
  messagingSenderId: "375402689228",
  appId: "1:375402689228:web:6d8bb1886a9da9496c8869",
  measurementId: "G-HTJXLJK9QY",
  databaseURL: "https://smart-lecture-149cf-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Show/hide register/login forms
document.getElementById("show-register").addEventListener("click", () => {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", () => {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
});

// Register
document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const mobile = document.getElementById("register-mobile").value;
  const role = document.getElementById("register-role").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return set(ref(database, "users/" + uid), {
        email,
        mobile,
        role
      });
    })
    .then(() => {
      alert("Registered successfully!");
      document.getElementById("register-form").style.display = "none";
      document.getElementById("login-form").style.display = "block";
    })
    .catch((error) => {
      alert("Registration Error: " + error.message);
    });
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
});

// Add Lecture
document.getElementById("addLectureBtn").addEventListener("click", () => {
  const name = document.getElementById("lectureName").value;
  const teacher = document.getElementById("teacherName").value;
  const time = document.getElementById("lectureTime").value;

  if (name && teacher && time) {
    const lectureRef = push(ref(database, "lectures"));
    set(lectureRef, {
      name,
      teacher,
      time
    });

    const li = document.createElement("li");
    li.textContent = `${name} by ${teacher} at ${time}`;
    document.getElementById("lectureList").appendChild(li);

    notifyUser("Lecture added successfully!");
    document.getElementById("lectureName").value = "";
    document.getElementById("teacherName").value = "";
    document.getElementById("lectureTime").value = "";
  } else {
    notifyUser("Please fill all lecture details.");
  }
});

// Notifications (Text + Speech + Image)
function notifyUser(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";

  const utterance = new SpeechSynthesisUtterance(message);
  speechSynthesis.speak(utterance);

  document.getElementById("timetable-img").style.display = "block";
}
// Get elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerBtn = document.getElementById('registerBtn');
const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');

showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
  // Your registration logic here (validation, API call, etc.)
  
  // After successful registration:
  alert("Registration successful! Please login.");

  // Switch to login form:
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});
