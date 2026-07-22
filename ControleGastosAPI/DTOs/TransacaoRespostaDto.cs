using ControleGastosAPI.Models;

namespace ControleGastosAPI.DTOs
{
    public class TransacaoRespostaDto
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; }
    }
}
