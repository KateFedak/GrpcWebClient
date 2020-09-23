
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