using System.ComponentModel.DataAnnotations;

namespace ControleGastosAPI.Models
{
    // Representa uma pessoa cadastrada no sistema, dona de zero ou mais transações.
    public class Pessoa
    {
        public Guid Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Range (1, 120)]
        public int Idade { get; set; }
        public List<Transacao> Transacoes { get; set; } = new();
    }
}
