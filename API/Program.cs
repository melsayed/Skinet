using API.Middleware;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddCors();
builder.Services.AddSingleton<IConnectionMultiplexer>(config =>
{
    var connstring = builder.Configuration.GetConnectionString("Redis") ?? throw new Exception("Redis connection string is null");
    var configuration = ConfigurationOptions.Parse(connstring, true);
    return ConnectionMultiplexer.Connect(configuration);
});
builder.Services.AddSingleton<ICartService, CartService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddAuthentication();
builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

//app.UseHttpsRedirection();

// app.UseCors(x => x
//                 .AllowAnyMethod()
//                 .AllowAnyHeader()
//                 .SetIsOriginAllowed(origin => true) // allow any origin
//                 .AllowCredentials());

//app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials() //This to Allow receiving Cookie from client
.WithOrigins("http://localhost:4200", "https://localhost:4200", "http://localhost:4400", "https://localhost:4400","http://localhost:6002","https://localhost:6002"));

app.MapControllers();

//This for mapping Identity API endpoints
app.MapGroup("api").MapIdentityApi<AppUser>(); //  api/login instead of /login

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
}
catch (Exception ex)
{
    Console.WriteLine(ex);
    throw;
}

app.Run();