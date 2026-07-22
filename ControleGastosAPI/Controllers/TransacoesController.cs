using ControleGastosAPI.Data;
using ControleGastosAPI.DTOs;
using ControleGastosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml;

namespace ControleGastosAPI.Controllers
{
    // Controller responsável pelo cadastro e listagem de Transações
    // (edição/exclusão não são exigidas pelo desafio).
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
        public async Task<ActionResult<IEnumerable<TransacaoRespostaDto>>> GetTransacoes()
        {
            var transacoes = await _context.Transacoes
                .Select(t => new TransacaoRespostaDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    PessoaId = t.PessoaId
                })
                .ToListAsync();

            return Ok(transacoes);
        }

        // POST: api/transacoes
        // Cadastra uma nova transação, validando:
        // 1) se a pessoa informada existe;
        // 2) a regra de negócio principal do desafio: menores de 18 anos
        //    só podem cadastrar Despesa, nunca Receita.
        [HttpPost]
        public async Task<ActionResult<TransacaoRespostaDto>> CriarTransacao(CriarTransacaoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);

            if (pessoa == null)
                return BadRequest("Pessoa informada não existe.");

            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
                return BadRequest("Menores de idade só podem possuir despesas.");

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId
            };

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            var resposta = new TransacaoRespostaDto
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                Tipo = transacao.Tipo,
                PessoaId = transacao.PessoaId
            };

            return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, resposta);
        }
    }
}
