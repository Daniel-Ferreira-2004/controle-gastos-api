using ControleGastosAPI.Data;
using ControleGastosAPI.DTOs;
using ControleGastosAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/pessoas
        // Lista todas as pessoas cadastradas.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
        {
            var pessoas = await _context.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        // POST: api/pessoas
        // Cadastra uma nova pessoa
        [HttpPost]
        public async Task<ActionResult<Pessoa>> CriasPessoa(CriarPessoaDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade,
            };

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
        }

        // DELETE: api/pessoas/{id}
        // Remove uma pessoa e, em cascata, todas as suas transações
        // (comportamento configurado no AppDbContext via OnDelete(Cascade)).
        [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarPessoa(Guid id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
            {
                return NotFound();
            }

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
