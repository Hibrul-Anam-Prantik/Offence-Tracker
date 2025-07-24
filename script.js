import { getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgJqilQlgM8WwD4d0dPgAZlXtt3glAJI4",
  authDomain: "offence-tracker.firebaseapp.com",
  projectId: "offence-tracker",
  storageBucket: "offence-tracker.firebasestorage.app",
  messagingSenderId: "465505128950",
  appId: "1:465505128950:web:a21a61050652161f7e37d7",
  measurementId: "G-098GQ7MD65"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initial offence record
const records = {
  'Arnab': 0,
  'Azam': 0,
  'Prantik': 0,
  'Rial': 0
};

async function loadRecords() {
  const docRef = doc(db, "offences", "flatmates");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    Object.keys(data).forEach(name => {
      records[name] = data[name];
    });
  } else {
    // First-time setup
    await setDoc(docRef, records);
  }

  renderMembers();
}

loadRecords();


// Map each name to a custom CSS class
const memberClasses = {
  'Arnab': 'arnab',
  'Azam': 'azam',
  'Prantik': 'prantik',
  'Rial': 'rial'
};

const membersDiv = document.getElementById('members');
const messageDiv = document.getElementById('message');

// Render all members
function renderMembers() {
  membersDiv.innerHTML = '';

  for (let name in records) {
    const card = document.createElement('div');
    card.className = `card ${memberClasses[name]}`;

    const title = document.createElement('h2');
    title.textContent = name;

    const count = document.createElement('div');
    count.className = 'offence-count';
    count.id = `count-${name}`;
    count.textContent = `Offences: ${records[name]}`;

    const btn = document.createElement('button');
    btn.textContent = 'Add Offence';
    btn.onclick = () => addOffence(name);

    card.appendChild(title);
    card.appendChild(count);
    card.appendChild(btn);
    membersDiv.appendChild(card);
  }
}

// Handle offence logic
async function addOffence(name) {
  records[name] += 1;

  if (records[name] >= 5) {
    messageDiv.textContent = `🎉 ${name}, you reached 5 offences! Treat time!`;
    messageDiv.classList.add('active');
    records[name] = 0;
  } else {
    messageDiv.textContent = `${name} now has ${records[name]} offences.`;
    messageDiv.classList.add('active');
  }

  // Update Firestore
  const docRef = doc(db, "offences", "flatmates");
  await updateDoc(docRef, { [name]: records[name] });

  document.getElementById(`count-${name}`).textContent = `Offences: ${records[name]}`;
}


// Initialize the UI
renderMembers();
