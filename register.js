document.addEventListener("DOMContentLoaded", function () {
    // Load existing data from localStorage
    let enrolledStudents = JSON.parse(localStorage.getItem("savedEnrolledStudents")) || [];

    let schNameInput = document.getElementById("schoolName");
    let studentNameInput = document.getElementById("studentName");

    function validateForm() {
        let schoolName = schNameInput.value.trim();
        let studentName = studentNameInput.value.trim();

        if (schoolName === "" || studentName === "") {
            alert("Please fill in all fields");
            return false;
        }

        // Check if the school name or student name already exists
        for (let i = 0; i < enrolledStudents.length; i++) {
            if (enrolledStudents[i].schoolName === schoolName || enrolledStudents[i].studentName === studentName) {
                alert("This school or student is already enrolled");
                return false;
            }
        }

        window.location.href = "question.html"
        return true;

        
    }

    function enrollStudent() {
        if (validateForm()) {
            let schoolName = schNameInput.value;
            let studentName = studentNameInput.value;

            let student = {
                schoolName: schoolName,
                studentName: studentName,
            };

            enrolledStudents.push(student);

            // Update localStorage with the new data
            localStorage.setItem("savedEnrolledStudents", JSON.stringify(enrolledStudents));

            schNameInput.value = "";
            studentNameInput.value = "";
        }
    }

    document.getElementById("btnEnroll").addEventListener("click", function (event) {
        event.preventDefault();
        enrollStudent();
    });
});
