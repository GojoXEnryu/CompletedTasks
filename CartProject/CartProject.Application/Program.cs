using Microsoft.EntityFrameworkCore;
using CartProject.Infrastructure;

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

builder.Services.AddDbContext<CartContext>(b => b.UseNpgsql(connectionString));

builder.Services.AddBusinessLogic(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(myAllowSpecificOrigins);
app.AddCartRouter();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.Run();