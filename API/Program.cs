using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt=>opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddCors();

var app = builder.Build();

//app.UseHttpsRedirection();

// app.UseCors(x => x
//                 .AllowAnyMethod()
//                 .AllowAnyHeader()
//                 .SetIsOriginAllowed(origin => true) // allow any origin
//                 .AllowCredentials());

//app.UseAuthorization();

app.MapControllers();

app.Run();