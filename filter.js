$(document).ready(function() {
            $('#onlFemalesFilter').click(function(){
                //console.log('onlyFemalesFilter Filter executed');
                volunteersRef.where("gender", "==", "Female")
                .onSnapshot(function(querySnapshot){
                  LoadTableData(querySnapshot);
                });
            });

            $('#isStudentFilter').click(function(){
                //console.log('isStudent Filter executed');
                volunteersRef.where("isStudent", "==", "true")
                .onSnapshot(function(querySnapshot){
                  LoadTableData(querySnapshot);
                });
            });

            $('#olderThenFilter').click(function(){
                //console.log('olderThenFilter Filter executed');
                volunteersRef.where("age", ">=", "14")
                .onSnapshot(function(querySnapshot){
                  LoadTableData(querySnapshot);
                });
            });

            $('#ageBetweenFilter').click(function(){
                //console.log('ageBetweenFilter Filter executed');
                volunteersRef.where("age", ">=", "18", "<=", "25")
                .onSnapshot(function(querySnapshot){
                  LoadTableData(querySnapshot);
                });
            });

            $('#gradeLevelFilter').click(function(){
                //console.log('gradeLevel Filter executed');
                volunteersRef.where("gradeLevel", ">=", "10")
                .onSnapshot(function(querySnapshot){
                  LoadTableData(querySnapshot);
                });
            });

            $('#clearFilter').click(function(){
                console.log('clearFilter Filter executed');
            });

            $("#searchVolunteer" ).change(function() {
                //console.log('You entered: ', $(this).val());
                var searchValue = $(this).val();
                volunteersRef.onSnapshot(function(querySnapshot){
                  LoadTableData(querySnapshot);
                });
            });
});

//event listener
db.collection("volunteers").onSnapshot(function(snapShot){
  console.log("something has changed");
  snapShot.docChanges.forEach(function(change){
    if(chnage.type === "added"){
      console.log("Volunteer Added ");
    }
    if(change.type === "modified"){
      console.log("Volunteer Modified ");
    }
    if(change.type === "removed"){
      console.log("Volunteer Removed ");
    }
  });
  LoadTableData(snapShot);
});

//Function for LoadTableData
function LoadTableData(querySnapshot){
  var tableRow='';
  querySnapshot.forEach(function(doc){
    var document = doc.data();
    tableRow += '<tr>';
    tableRow += '<td class = "fname">' + document.fname + '</td>';
    tableRow += '<td class = "lname">' + document.lname + '</td>';
    tableRow += '<td class = "email">' + document.email + '</td>';
    tableRow += '<td class = "age">' + document.age + '</td>';
    tableRow += '<td class = "gender">' + document.gender + '</td>';
    tableRow += '<td class = "gradeLevel">' + document.gradeLevel + '</td>';
    tableRow += '<td class = "isStudent">' + document.isStudent + '</td>';
    tableRow += '<td class = "editVolunteer"><i class="fa fa-pencil" aria-hideen="true" style="color:green"></i></td>';
    tableRow += '<td class = "deleteVolunteer"><i class="fa fa-trash" aria-hideen="true" style="color:red"></i></td>';
    tableRow += '<tr>';
  });
  $('tbody.tbodyData').html(tableRow);
}
