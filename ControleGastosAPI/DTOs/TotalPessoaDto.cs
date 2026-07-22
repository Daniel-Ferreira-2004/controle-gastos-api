
namespace ControleGastosAPI.DTOs
{
    public class TotalPessoaDto
    {
        // Resumo financeiro de uma única pessoa: total de receitas,
        // despesas e o saldo (receita - despesa).

        public string Nome { get; set; }
        public decimal Receitas { get; set; }
        public decimal Despesas { get; set; }
        public decimal Saldo { get; set; }
    }
}
