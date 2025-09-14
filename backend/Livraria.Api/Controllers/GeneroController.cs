using Microsoft.AspNetCore.Mvc;
using Livraria.Application.Services;
using Livraria.Application.DTOs;

[ApiController]
[Route("api/v1/[controller]")]
public class GeneroController : ControllerBase
{
    private readonly IGeneroService _service;

    public GeneroController(IGeneroService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GeneroDto>>> Get()
    {
        var generos = await _service.GetAllAsync();
        return Ok(generos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GeneroDto>> Get(Guid id)
    {
        try
        {
            var genero = await _service.GetByIdAsync(id);
            return Ok(genero);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<GeneroDto>> Post([FromBody] GeneroDto generoDto)
    {
        var created = await _service.CreateAsync(generoDto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<GeneroDto>> Put(Guid id, [FromBody] GeneroDto generoDto)
    {
        try
        {
            var updated = await _service.UpdateAsync(id, generoDto);
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