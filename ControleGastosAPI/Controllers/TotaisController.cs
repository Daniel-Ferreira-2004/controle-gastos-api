using ControleGastosAPI.Data;
using ControleGastosAPI.DTOs;
using ControleGastosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TotaisController : Controller
    {
        private readonly AppDbContext _context;

        public TotaisController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/totais
        // Retorna o total de receitas, despesas e saldo de cada pessoa,
        // além do total geral somando todas as pessoas.
        [HttpGet]
        [HttpGet]
        public async Task<ActionResult<TotaisResponseDto>> GetTotais()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var resposta = new TotaisResponseDto();

            foreach (var pessoa in pessoas)
            {
                var receitas = pessoa.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                var despesas = pessoa.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                resposta.Pessoas.Add(new TotalPessoaDto
                {
                    Nome = pessoa.Nome,
                    Receitas = receitas,
                    Despesas = despesas,
                    Saldo = receitas - despesas
                });

                resposta.TotalReceitas += receitas;
                resposta.TotalDespesas += despesas;
            }

            resposta.SaldoGeral = resposta.TotalReceitas - resposta.TotalDespesas;

            return Ok(resposta);
        }
    }

 }
