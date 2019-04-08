import firebase from "./init";


export const uploadImage = image => {
  return new Promise(resolve => {
    const storage = firebase.storage().ref();
    const fileRef = storage.child(`images/${image.name}`);

    fileRef.put(image).then(snapshot => {
      console.log("snapshot.downloadURL", snapshot.downloadURL)
      resolve(snapshot.downloadURL)
    });
  })
}

