const uid = sessionStorage.getItem('uid');
let chatUnsub;
let selectedChat;

const db = firebase.firestore();

const contactsEl = document.getElementById('contactsList');

document.getElementById('chatInput').addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key === 'Enter' && event.target.value) {
    insertMessage({ content: event.target.value, who: uid, date: new Date() });
    event.target.value = '';
    scrollToBottom();
  }
})

//Adiciona uma mensagem à subcollection messages
function insertMessage(message) {
  db.collection('chats').doc(selectedChat).collection('messages').add(message);
}

if (!sessionStorage.getItem('token')) {
  window.location.replace('login/login.html');
} else {
  loadAndListenToUsersCollection();
}

document.addEventListener('visibilitychange', (event) => {
  if (document.hidden) {
    db.collection('users').doc(uid).update({ status: 'offline' });
  } else {
    db.collection('users').doc(uid).update({ status: 'online' });
  }
});

//Escuta todas as mudanças na coleçao 'users'
function loadAndListenToUsersCollection() {
  const myUserId = uid;
  db.collection('users').where('uid', '!=', myUserId).onSnapshot(function(docs) {
    const contacts = [];
    contactsEl.innerHTML = '';
    docs.forEach(doc => {
      const data = doc.data();
      const contact = { id: doc.id, ...data };
      contacts.push(contact);
      appendContactElement(contact);
    });
  });
}

//Escuta às mudanças do documento especifico passado por parametro
function listenToChat(contactId) {
  if (chatUnsub) {
    chatUnsub();
  }
  let chatId;
  if (contactId > uid) {
    chatId = contactId + uid;
  } else {
    chatId = uid + contactId;
  }
  setContactName(contactId);
  selectedChat = chatId;
  db.collection('chats').doc(chatId).set({
    participants: [uid, contactId]
  });
  chatUnsub = db.collection('chats').doc(chatId).collection('messages').orderBy('date', 'asc').onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(change => {
      appendMessageElement(change.doc.data());
    });
    scrollToBottom();
  });
}

function setContactName(contactId) {
  db.collection('users').doc(contactId).get().then(user => {
    document.getElementById('contactName').innerHTML = user.data().displayName;
  });
}

function appendContactElement(contact) {
  const el = document.createElement('li');
  el.id = contact.id;
  $(el).click(function() {
    const chatEl = document.getElementById('chat');
    chatEl.innerHTML = '';
    listenToChat(this.id);
  });
  el.innerHTML = `<div class="d-flex bd-highlight" style="cursor: pointer;">
    <div class="img_cont">
      <img src="${contact.photoURL}" class="rounded-circle user_img">
      <span class="${contact.status === 'online' ? 'online_icon' : 'online_icon offline'}"></span>
    </div>
    <div class="user_info">
      <span>${contact.displayName}</span>
      <p>${contact.displayName} is ${contact.status}</p>
    </div>
  </div>`;
  contactsEl.append(el);
}

function appendMessageElement(message) {
  const chatEl = document.getElementById('chat');
  const el = document.createElement('div');
  if (message.who === uid) {
    el.innerHTML = `<div class="d-flex justify-content-end mb-4">
    <div class="msg_cotainer_send">
      ${message.content}
    </div>
  </div>`;
  } else {
    el.innerHTML = `<div class="d-flex justify-content-start mb-4">
    <div class="msg_cotainer">
      ${message.content}
    </div>
  </div>`;
  }
  chatEl.append(el);
}

function scrollToBottom(speed) {
  speed = speed || 400;
  setTimeout(() => {
    document.getElementById('chat').scroll(0, document.getElementById('chat').scrollHeight)
  }, speed);
}