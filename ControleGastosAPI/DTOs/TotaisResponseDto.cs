namespace ControleGastosAPI.DTOs
{
    public class TotaisResponseDto
    {
        // Representa a resposta completa do endpoint de totais:
            public List<TotalPessoaDto> Pessoas { get; set; } = new();
            public decimal TotalReceitas { get; set; }
            public decimal TotalDespesas { get; set; }
            public decimal SaldoGeral { get; set; }
     }
}
