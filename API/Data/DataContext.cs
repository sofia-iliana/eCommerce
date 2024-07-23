using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<TeaItem> TeaItems { get; set; }
    public DbSet<Order> Orders { get; set; }
}
