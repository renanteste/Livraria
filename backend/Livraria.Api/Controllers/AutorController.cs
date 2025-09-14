using Microsoft.AspNetCore.Mvc;
using Livraria.Application.Services;
using Livraria.Application.DTOs;

[ApiController]
[Route("api/v1/[controller]")]
public class AutorController : ControllerBase
{
    private readonly IAutorService _service;

    public AutorController(IAutorService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AutorDto>>> Get()
    {
        var autores = await _service.GetAllAsync();
        return Ok(autores);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AutorDto>> Get(Guid id)
    {
        try
        {
            var autor = await _service.GetByIdAsync(id);
            return Ok(autor);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<AutorDto>> Post([FromBody] AutorDto autorDto)
    {
        var created = await _service.CreateAsync(autorDto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AutorDto>> Put(Guid id, [FromBody] AutorDto autorDto)
    {
        try
        {
            var updated = await _service.UpdateAsync(id, autorDto);
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
