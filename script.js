// Initial offence record
const records = {
  'Arnab': 0,
  'Azam': 0,
  'Prantik': 0,
  'Rial': 0
};
 
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
function addOffence(name) {
  records[name] += 1;

  if (records[name] >= 5) {
    messageDiv.textContent = `🎉 ${name}, you reached 5 offences! Treat time!`;
    messageDiv.classList.add('active');
    records[name] = 0; // reset
  } else {
    messageDiv.textContent = `${name} now has ${records[name]} offences.`;
    messageDiv.classList.add('active');
  }

  // Update the count visually
  document.getElementById(`count-${name}`).textContent = `Offences: ${records[name]}`;
}

// Initialize the UI
renderMembers();
