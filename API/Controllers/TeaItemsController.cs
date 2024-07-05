using System.Runtime.CompilerServices;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeaItemsController(DataContext context) : ControllerBase
{
    //private readonly DataContext _context = context;
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeaItem>>> GetItems()
    {
        var teaItems = await context.TeaItems.ToListAsync();

        return teaItems;
    }

}
