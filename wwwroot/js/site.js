
function LoadEmployee() {
    $.ajax({
        url: "/api/employee",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var output = '';
            $.each(result, function (key, item) {
                output += '<tr>';
                output += '<td>' + item.employeeId + '</td>';
                output += '<td>' + item.firstname + '</td>';
                output += '<td>' + item.lastname + '</td>';
                output += '<td>' + item.salary + '</td>';
                output += `<td><a href="#" class="btn redgate" onclick="SetUpEditModal(${item.employeeId})">Edit</a> |
                        <a href="#" class="btn redgate" onclick="DeleteEmployee(${item.employeeId})">Delete</a></td>`;
                output += '</tr>';
            });
            $('.tbody').html(output);
        },
        error: function (message) {
            console.log(message.responseText);
        }
    });
}
function AddEmployee() {
    var res = validateForm();
    if (res == false) {
        return false;
    }
    var employeeObj = {
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Salary: parseFloat($('#Salary').val()),
    };

    $.ajax({
        url: "/api/employee",
        data: JSON.stringify(employeeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        success: function () {
            LoadEmployee();
            $('#employeeModal').modal('hide');
        },
        error: function (message) {
            console.log(message.responseText);
        }
    });
}
function SetUpEditModal(id) {
    $('form input').css('border-color', 'grey');
    $('#employeeModal h4').text('Edit Employee');

    $.ajax({
        url: "/api/employee/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.employeeId);
            $('#FirstName').val(result.firstname);
            $('#LastName').val(result.lastname);
            $('#Salary').val(result.salary);
            $('#employeeModal').modal('show');
            $('#btnUpdateEmployee').show();
            $('#btnAddEmployee').hide();
        },
        error: function (message) {
            console.log(message.responseText);
        }
    });
    return false;
}
function UpdateEmployee() {
    if (!validateForm()) {
        return false;
    }
    var employeeObj = {
        EmployeeID: parseInt($('#EmployeeID').val()),
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Salary: parseFloat($('#Salary').val()),
    };
    $.ajax({
        url: "/api/employee",
        data: JSON.stringify(employeeObj),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function () {
            LoadEmployee();

            $('#employeeModal').modal('hide');

            clearStuff();
        },
        error: function (message) {
            console.log(message.responseText);
        }
    });
}
function clearStuff() {
    $('form').trigger("reset");
    $('#btnUpdateEmployee').hide();
    $('#employeeModal h4').text('Add Employee');
    $('#btnAddEmployee').show();
}
function DeleteEmployee(id) {
    if (confirm("Are you sure?")) {
        $.ajax({
            url: "/api/employee/" + id,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function () {
                LoadEmployee();
            },
            error: function (message) {
                console.log(message.responseText);
            }
        });
    }
}
function validateForm() {
    var isValid = true;
    if ($('#FirstName').val().trim() == "") {
        $('#FirstName').css('border-color', '#c00');
        isValid = false;
    }
    else {
        $('#FirstName').css('border-color', 'grey');
    }
    if ($('#LastName').val().trim() == "") {
        $('#LastName').css('border-color', '#c00');
        isValid = false;
    }
    else {
        $('#LastName').css('border-color', 'grey');
    }
    if ($('#Salary').val().trim() == "") {
        $('#Salary').css('border-color', '#c00');
        isValid = false;
    }
    else {
        $('#Salary').css('border-color', 'grey');
    }

    return isValid;
}
LoadEmployee();