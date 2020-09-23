using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Net.Client;
using GrpcServiceSimple;
using Microsoft.AspNetCore.Mvc;

namespace GrpcWebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
		private readonly GrpcChannel channel;
		public EmployeeController()
		{
			channel = GrpcChannel.ForAddress("https://localhost:5001");
		}
		[HttpGet]
		public List<Employee> GetAll()
		{
			var client = new Greeter.GreeterClient(channel);
			return client.GetAll(new Empty()).Employee.ToList();
		}
		[HttpGet("{id}", Name = "GetEmployee")]
		public IActionResult GetById(int id)
		{
			var client = new Greeter.GreeterClient(channel);
			var employee = client.Get(new EmployeeId { Id = id });
			if (employee == null)
			{
				return NotFound();
			}
			return new ObjectResult(employee);
		}
		[HttpPost]
		public IActionResult Post([FromBody] Employee employee)
		{
			var client = new Greeter.GreeterClient(channel);
			var createdEmployee = client.Insert(employee);

			return CreatedAtRoute("GetEmployee", new { id = createdEmployee.EmployeeId }, createdEmployee);
		}
		[HttpPut]
		public IActionResult Put([FromBody] Employee employee)
		{
			var client = new Greeter.GreeterClient(channel);
			var udpatedEmployee = client.Update(employee);
			if (udpatedEmployee == null)
			{
				return NotFound();
			}
			return NoContent();
		}
		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var client = new Greeter.GreeterClient(channel);
			client.Delete(new EmployeeId { Id = id });
			return new ObjectResult(id);
		}
	}
}
