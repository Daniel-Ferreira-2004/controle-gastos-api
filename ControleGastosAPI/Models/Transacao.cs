using System.ComponentModel.DataAnnotations;

namespace ControleGastosAPI.Models
{
    // Define os dois únicos tipos de transação permitidos pelo desafio.
    public enum TipoTransacao
    {
        Receita,
        Despesa
    }
    // Representa um lançamento financeiro (entrada ou saída) de uma pessoa.
    public class Transacao
    {
        public Guid Id { get; set; }
        [Required]
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        [Required]
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; }
        public Pessoa Pessoa { get; set; } = null!;
    }
}