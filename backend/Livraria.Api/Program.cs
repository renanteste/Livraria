using Livraria.Application.Services;
using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Infrastructure.Data;
using Livraria.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configuração do CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            // Configuração do banco
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version(8, 0, 36))
                ));

            // Repositórios
            builder.Services.AddScoped<IRepository<Genero>, LivroRepository<Genero>>();
            builder.Services.AddScoped<IRepository<Autor>, LivroRepository<Autor>>();
            builder.Services.AddScoped<IRepository<Livro>, LivroRepository<Livro>>();

            // Serviços
            builder.Services.AddScoped<IGeneroService, GeneroService>();
            builder.Services.AddScoped<IAutorService, AutorService>();
            builder.Services.AddScoped<ILivroService, LivroService>();
            builder.Services.AddScoped<ILivroRepository, LivroRepository>();

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Controllers
            builder.Services.AddControllers();

            var app = builder.Build();

            app.UseCors("AllowAll");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
