namespace Livraria.Domain.Entities
{
    public class Genero : BaseEntity
    {
        public string Nome { get; set; } = string.Empty;
        public ICollection<Livro> Livros { get; set; } = new List<Livro>();
    }
}