$(document ).ready(function() {

/*
  //get all the database
  LoadData();

  //This function will load the database
  function LoadData(){
    volunteersRef.get().then(fucntion(querySnapshot){
      LoadTableData(querySnapshot)
    });
  }

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
*/

    //get all the data on app startup
    $('#createVolunteer').click(function(){
        $('.volunteerForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function(){
        //volunteer form values
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#email").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var gradeLevel = $("#gradeLevel").val();
        var isStudent = $('#isStudent').is(":checked")

        //check if you need to create or update an volunteer
        if($(this).text() == "Save Changes"){
          var docuName = fname.charAt(0)+"."+lname;
          db.collection("volunteers").doc(docuName).set({
            fname: fname,
            lname: lname,
            email: email,
            age: age,
            gender: gender,
            gradeLevel: gradeLevel,
            isStudent: isStudent
          }).then(function(docRef){
            $('#operationStatus').html(<div class="alert alert-success" ><strong>Success!</strong>A new volunteer was added!</div').delay(2500).fadeOut('slow');
            $('.volunteerForm').css("display", "none");
            //LoadData();
          }).catch(function(error){
            $('#operationStatus').html(<div class="alert alert-danger"><strong>Error!</strong>Volunteer was not created!</div>').delay(2500).fadeOut('slow');
          });
        }
        else{
          var docuName = fname.charAt(0)+"."+lname;
          var sfDocRef = db.collection("Volunteers").doc(docuName);
          sfDocRef.set({
            fname: fname,
            lname: lname,
            email: email,
            age: age,
            gender: gender,
            gradeLevel: gradeLevel,
            isStudent: isStudent
        },
        {
          merge:true
        }).then(function(){
          $('#operationStatus').html(<div class="alert alert-success" ><strong>Success!</strong>Volunteer was updated!</div').delay(2500).fadeOut('slow');
          $('.volunteerForm').css("display", "none");
        //  LoadData();
        })
        .catch(function(error){
            $('#operationStatus').html(<div class="alert alert-danger"><strong>Error!</strong>Volunteer was not updated!</div>').delay(2500).fadeOut('slow');
        });
      }
    });

    // Cancel the volunteer form
    $('#cancel').click(function(){
        $('.volunteerForm').css("display", "none");
    });

    // Get the data of the volunteer you want to edit
    $("tbody.tbodyData").on("click","td.editVolunteer", function(){
        $('.volunteerForm').css("display", "block");
        $('#dynamicBtn').text('Update Volunteer');

        $("#fname").val($(this).closest('tr').find('.fname').text());
        $("#lname").val($(this).closest('tr').find('.lname').text());
        $("#email").val($(this).closest('tr').find('.email').text());
        $("#age").val($(this).closest('tr').find('.age').text());
        $("#gender").val($(this).closest('tr').find('.gender').text());
        $("#gradeLevel").val($(this).closest('tr').find('.gradeLevel').text());
        $("#isStudent").prop('checked', $(this).closest('tr').find('.isStudent').text() === 'true');
    });

    // Delete volunteer
    $("tbody.tbodyData").on("click","td.deleteVolunteer", function(){
        //Get the Volunteer Data
        var fName = $(this).closest('tr').find('.fname').text(); //First Name
        var lName = $(this).closest('tr').find('.lname').text(); //Last Name

        var docuName = fname.charAt(0)+"."+lname;
        db.collection("volunteers").doc(docuName).delete().then(function(){
          $('#operationStatus').html(<div class="alert alert-success" ><strong>Success!</strong>Volunteer was deleted!</div').delay(2500).fadeOut('slow');
          //LoadData();
        }).catch(function(error){
          $('#operationStatus').html(<div class="alert alert-danger"><strong>Error!</strong>Volunteer was not deleted!</div>').delay(2500).fadeOut('slow');
        });
    });

    /*
    $("#searchVolunteer" ).change(function() {
        console.log('You entered: ', $(this).val());
      });
    */
});
