namespace Livraria.Application.DTOs
{
    public class LivroDto
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public Guid AutorId { get; set; }
        public Guid GeneroId { get; set; }
        public string AutorNome { get; set; } = string.Empty;
        public string GeneroNome { get; set; } = string.Empty;
    }
}