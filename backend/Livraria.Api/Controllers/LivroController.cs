using Microsoft.AspNetCore.Mvc;
using Livraria.Application.Services;
using Livraria.Application.DTOs;

[ApiController]
[Route("api/v1/[controller]")]
public class LivroController : ControllerBase
{
    private readonly ILivroService _service;

    public LivroController(ILivroService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LivroDto>>> Get()
    {
        var livros = await _service.GetAllAsync();
        return Ok(livros);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LivroDto>> Get(Guid id)
    {
        try
        {
            var livro = await _service.GetByIdAsync(id);
            return Ok(livro);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<LivroDto>> Post([FromBody] LivroDto livroDto)
    {
        var created = await _service.CreateAsync(livroDto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<LivroDto>> Put(Guid id, [FromBody] LivroDto livroDto)
    {
        try
        {
            var updated = await _service.UpdateAsync(id, livroDto);
            return Ok(updated);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}
