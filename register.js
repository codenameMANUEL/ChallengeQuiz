document.addEventListener("DOMContentLoaded", function () {
    // Load existing data from localStorage
    let enrolledStudents = JSON.parse(localStorage.getItem("savedEnrolledStudents")) || [];
    let enrollBtn = document.getElementById("btnEnroll")

    let schNameInput = document.getElementById("schoolName");
    let studentNameInput = document.getElementById("studentName");
    let errorSchoolName = document.getElementById("errorSchoolName");
    let errorStudentName = document.getElementById("errorStudentName");
    let passwordInput = document.getElementById("PasswordReg");
    let errorpasswordReg = document.getElementById("errorpassword")

    function validateForm() {
        let schoolName = schNameInput.value.trim();
        let studentName = studentNameInput.value.trim();
        let PasswordReg = passwordInput.value.trim()

        if (schoolName === "" || studentName === "" || PasswordReg === "") {
            errorSchoolName.style.fontSize = "12px"
            errorSchoolName.style.color = "red"
            errorSchoolName.innerHTML = "Name of school is required"
            errorSchoolName.style.paddingLeft = "58px"
            errorSchoolName.style.paddingBottom = "10px"
            errorStudentName.style.paddingTop = "10px"
            errorStudentName.style.fontSize = "12px"
            errorStudentName.style.color = "red"
            errorStudentName.style.paddingLeft = "58px"
            errorStudentName.innerHTML = "Student name is required"
            errorpasswordReg.style.color = "red"
            errorpasswordReg.style.fontSize = "12px"
            errorpasswordReg.style.paddingLeft = "58px"
            errorpasswordReg.style.paddingTop = "10px"
            errorpasswordReg.innerHTML = "Password is reqired"
            return false;
        }else{
            alert("Registration Completed")
            window.location.href = "login.html"
        }

        // Check if the school name or student name already exists
        for (let i = 0; i < enrolledStudents.length; i++) {
            if (enrolledStudents[i].schoolName === schoolName || enrolledStudents[i].studentName === studentName ) {
                alert("This school or student is already enrolled");
                return false;
            }
        }

        return true;
    }

     function enrollStudent() {
        if (validateForm()) {
            let schoolName = schNameInput.value;
            let studentName = studentNameInput.value;
            let studentPassword = passwordInput.value;

            let student = {
                schoolName: schoolName,
                studentName: studentName,
                studentPassword: studentPassword
            };

            enrolledStudents.push(student);

            // Update localStorage with the new data
            localStorage.setItem("savedEnrolledStudents", JSON.stringify(enrolledStudents));

            schNameInput.value = "";
            studentNameInput.value = "";
            passwordInput.value = ""
        }
    }

    enrollBtn.addEventListener("click", function (event) {
        event.preventDefault();
        enrollStudent();
    });
    
    let login = document.getElementById("loginBtn");
    let nameOfStudentLogin = document.getElementById("studentNameLogin").value()
    let studentLoginPassword = document.getElementById("studentPasswordLogin").value
    let savedStudentInfo = JSON.parse(localStorage.getItem("savedEnrolledStudents"));
    let loginError = document.getElementById("errormsg");

    //console.log(savedStudentInfo)
    //console.log('check')
    for(let i = 0; i < savedStudentInfo.length; i++){
        if(savedStudentInfo[i]['studentName'] === nameOfStudentLogin && savedStudentInfo[i]["studentPassword"] === studentLoginPassword){
            window.location.href = "questions.html"
    }
    else{
        loginError.style.color = "white",
        loginError.innerHTML = "Incorrect Creditial",
        loginError.style.paddingTop = "10px"
    }
}
});

