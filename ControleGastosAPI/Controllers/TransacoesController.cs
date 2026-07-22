using ControleGastosAPI.Data;
using ControleGastosAPI.DTOs;
using ControleGastosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml;

namespace ControleGastosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : Controller
    {
        private readonly AppDbContext _context;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/transacoes
        // Lista todas as transações cadastradas.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
        {
            var transacoes = await _context.Transacoes.ToListAsync();
            return Ok(transacoes);
        }

        // POST: api/transacoes
        // Cadastra uma nova transação, validando:
        // 1) se a pessoa informada existe;
        // 2) se menores de 18 anos só estão cadastrando despesas.

        [HttpPost]
        public async Task<ActionResult<Transacao>> CriarTransacao(CriarTransacaoDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);

            if (pessoa == null)
                return BadRequest("Pessoa informada não existe");

            // Regra de negócio: menores de 18 anos só podem ter Despesa.
            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            {
                return BadRequest("Menores de idade só podem possuir despesas.");
            }
            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
            };

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
        }
    }
}
