using CartServiceApp.Services;
using Microsoft.EntityFrameworkCore;
using ProductProject.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Environment.IsDevelopment()
    ? builder.Configuration.GetConnectionString("DefaultConnection")
    : Environment.GetEnvironmentVariable("CONNECTION_STRING");

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
        policyBuilder =>
        {
            policyBuilder
                .WithOrigins("*")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services.AddGrpc();

builder.Services.AddDbContext<ProductContext>(b => b.UseNpgsql(connectionString));

builder.Services.AddBusinessLogic(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(myAllowSpecificOrigins);
app.AddProductRouter();

app.MapGrpcService<CartService>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.Run();