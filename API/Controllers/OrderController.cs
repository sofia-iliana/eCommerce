using System.Runtime.CompilerServices;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class OrderController(DataContext context) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Order>>> SendOrder(Order order)
    {
        context.Orders.Add(order);
        await context.SaveChangesAsync();
        return Ok(order);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var orders = await context.Orders.Include(o => o.OrderItems).ToListAsync();
        return orders;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(string id)
    {
        var order = await context.Orders.Where(o => o.Id == id).Include(o => o.OrderItems).SingleAsync();
        if (order == null) return NotFound();
        return order;
    }
}
