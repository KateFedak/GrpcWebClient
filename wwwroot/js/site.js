﻿
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

LoadEmployee();