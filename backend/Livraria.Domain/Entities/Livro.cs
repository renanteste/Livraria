namespace Livraria.Domain.Entities
{
    public class Livro : BaseEntity
    {
        public string Titulo { get; set; } = string.Empty;

        // FK para Autor
        public Guid AutorId { get; set; }
        public Autor Autor { get; set; }

        // FK para Genero
        public Guid GeneroId { get; set; }
        public Genero Genero { get; set; }
    }
}
