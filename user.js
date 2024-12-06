// form validation ============================================================

function validateForm() {
    let isValid = true;
  
    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
      error.style.display = 'none';
    });
  
    // Get the form fields and their values
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
  
    // FName validation
    if (firstname.trim() === "") {
      document.getElementById("firstnameError").textContent = "Name must be filled out.";
      document.getElementById("firstnameError").style.display = "inline";
      isValid = false;
    }

    // LName validation
    if (lastname.trim() === "") {
        document.getElementById("lastnameError").textContent = "Last Name must be filled out.";
        document.getElementById("lastnameError").style.display = "inline";
        isValid = false;
    }

    // Address validation
    if (address.trim() === "") {
        document.getElementById("addressError").textContent = "Address must be filled out.";
        document.getElementById("addressError").style.display = "inline";
        isValid = false;
    }
  
    // Return the result of the validation
    return isValid;
}


// crud operation ================================================================

const form = document.getElementById("recordForm");
const table = document.getElementById("recordtable");
let editIndex = null;

// Form submit handler
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) {
        return; // Stop if validation fails
    }

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const address = document.getElementById("address").value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${firstname}</td>
        <td>${lastname}</td>
        <td>${address}</td>
        <td>
            <button class="edit-btn" onclick="editRecord(this)">Edit</button>
            <button class="delete-btn" onclick="deleteRecord(this)">Delete</button>
        </td>
    `;

    if (editIndex !== null) {
        // If we are editing an existing row, replace it with the updated data
        table.rows[editIndex].replaceWith(row);
        editIndex = null; // Reset the edit index after updating
    } else {
        // Otherwise, add the new row to the table
        table.appendChild(row);
    }

    form.reset(); // Clear the form fields
});

// Edit function
function editRecord(button) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');

    // Populate the form with the current values
    document.getElementById("firstname").value = cells[0].innerText;
    document.getElementById("lastname").value = cells[1].innerText;
    document.getElementById("address").value = cells[2].innerText;

    // Store the index of the row being edited
    editIndex = row.rowIndex;
}

// Delete function
function deleteRecord(button) {
    const row = button.closest('tr');

    const userConfirmed = confirm("Are you sure you want to delete this record?");
    if (userConfirmed) {
        if (row) {
            row.remove(); // Remove the row from the table
        } else {
            console.error("Row not found for deletion.");
        }
    } else {
        console.log("Deletion cancelled.");
    }
}
