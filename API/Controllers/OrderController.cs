using API.Data;
using API.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;

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
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("haylie.herman@ethereal.email"));
        email.To.Add(MailboxAddress.Parse(order.Email));
        email.Subject = "Order received";
        email.Body = new TextPart(TextFormat.Plain) { Text = "Thank you " + order.FirstName + ",\r\n\r\nWe received your order. You can track your order with the id:" + order.Id };
        using var smtp = new SmtpClient();
        smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
        smtp.Authenticate("haylie.herman@ethereal.email", "rx5tMbjE5JMySSxuh5");
        smtp.Send(email);
        smtp.Disconnect(true);
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
