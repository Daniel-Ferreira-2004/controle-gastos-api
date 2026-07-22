using ControleGastosAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosAPI.DTOs
{
    public class CriarTransacaoDto
    {
        // Dados que o cliente envia para cadastrar uma transação.

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public TipoTransacao Tipo { get; set; }

        [Required]
        public Guid PessoaId { get; set; }
    }
}
