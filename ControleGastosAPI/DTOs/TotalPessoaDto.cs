
namespace ControleGastosAPI.DTOs
{
    public class TotalPessoaDto
    {
        public string Nome { get; set; }
        public decimal Receitas { get; set; }
        public decimal Despesas { get; set; }
        public decimal Saldo { get; set; }
    }
}
