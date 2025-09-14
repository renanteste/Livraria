using Livraria.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Livraria.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Genero> Generos { get; set; }
        public DbSet<Autor> Autores { get; set; }
        public DbSet<Livro> Livros { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relacionamentos
            modelBuilder.Entity<Genero>()
                .HasMany(g => g.Livros)
                .WithOne(l => l.Genero)
                .HasForeignKey(l => l.GeneroId)
                .OnDelete(DeleteBehavior.Restrict); // Evita exclusão em cascata

            modelBuilder.Entity<Autor>()
                .HasMany(a => a.Livros)
                .WithOne(l => l.Autor)
                .HasForeignKey(l => l.AutorId)
                .OnDelete(DeleteBehavior.Restrict); // Evita exclusão em cascata

            // Configurações de chave primária
            modelBuilder.Entity<Genero>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Autor>()
                .Property(a => a.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Livro>()
                .Property(l => l.Id)
                .ValueGeneratedOnAdd();

            // Configurações adicionais
            modelBuilder.Entity<Genero>()
                .Property(g => g.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Autor>()
                .Property(a => a.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Livro>()
                .Property(l => l.Titulo)
                .IsRequired()
                .HasMaxLength(200);
        }
    }
}