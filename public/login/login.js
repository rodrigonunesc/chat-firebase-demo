const db = firebase.firestore();

function googleLogin(event) {
  event.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  //Login através de PopUp
  firebase.auth().signInWithPopup(provider).then(function(result) {
    const token = result.credential.accessToken;
    sessionStorage.setItem('token', token);
    const user = result.user;
    saveUser(user).then(() => {
      sessionStorage.setItem('uid', user.uid);
      window.location.replace('../index.html');
    });
  }).catch(function(error) {
    console.log(error.message);
  });
}

function saveUser(user) {

  //Salva ou atualiza caso usuário já exista
  return new Promise((resolve, reject) => {
    db.collection('users').doc(user.uid).set({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      status: 'online'
    }).then(() => {
      resolve();
    });
  });
}