using System.ComponentModel.DataAnnotations;

namespace ControleGastosAPI.Models
{
    public enum TipoTransacao
    {
        Receita,
        Despesa
    }
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