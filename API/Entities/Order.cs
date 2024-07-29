namespace API.Entities;

public class Order
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Mobile { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required string Street { get; set; }
    public required string StreetNumber { get; set; }
    public required string Zip { get; set; }
    public string? Comments { get; set; }
    public required string DateOfOrder { get; set; }
    public required ICollection<OrderItem> OrderItems { get; set; }
}

public class OrderItem
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
