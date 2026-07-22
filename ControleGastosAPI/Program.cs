using ControleGastosAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Permite enviar/receber o Tipo da transação como texto
        // ("Receita"/"Despesa") em vez de número, deixando a API
        // mais legível para quem for consumi-la.
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Persistência via SQLite: os dados continuam salvos mesmo após
// fechar a aplicação, conforme exigido pelo desafio.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=controle.db"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();