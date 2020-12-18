//initialize firestore database

var db = firebase.firestore();
var volunteersRef = db.collection('volunteers');

//Add volunteers

/*
volunteersRef.doc("M. Tatalias").set({
  fname: "Martina",
  lname: "Tatalias",
  email: "mtatalias@gmail.com",
  age: 16,
  gender: "female",
  gradeLevel: 10,
  isStudent: true,
});

volunteersRef.doc("S. Hill").set({
  fname: "Sarah",
  lname: "Hill",
  email: "shill@hotmail.com",
  age: 18,
  gender: "female",
  gradeLevel: 12,
  isStudent: true,
});

volunteersRef.doc("T. James").set({
  fname: "Tom",
  lname: "James",
  email: "tjames@pointpark.edu",
  age: 21,
  gender: "male",
  gradeLevel: 16,
  isStudent: true,
});
*/

//Loading the database
volunteersRef.get().then((querySnapshot)=> {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id}`);
  })
})
