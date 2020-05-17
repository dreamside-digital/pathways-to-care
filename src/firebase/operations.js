import firebase, { stagingFirebase } from "./init";



export const uploadImage = image => {
  return new Promise(resolve => {
    const storage = firebase.storage().ref();
    const fileRef = storage.child(`images/${image.name}`);
    const uploadTask = fileRef.put(image)

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        default:
          break;
      }
    }, function(error) {
      console.log(error)
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        resolve(downloadURL)
      });
    });
  })
}

export const uploadFile = file => {
  return new Promise(resolve => {
    const storage = firebase.storage().ref();
    const fileRef = storage.child(`files/${file.name}`);

    const uploadTask = fileRef.put(file)

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        default:
          break;
      }
    }, function(error) {
      console.log(error)
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        resolve(downloadURL)
      });
    });
  })
}

export const copyContentFromStaging = () => {
  return new Promise((resolve, reject) => {
    if (!stagingFirebase) {
      reject("The staging database is not available.")
    }

    const stagingDB = stagingFirebase.database();
    const currentDB = firebase.database();

    stagingDB
      .ref(`pages`)
      .once("value")
      .then(snapshot => {
        const stagingPages = snapshot.val();

        currentDB
          .ref(`pages`)
          .set(stagingPages)
          .then(err => {
            if (err) {
              return reject(err)
            }

            resolve()
          })
      });
  })
}

