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
}
