using System.ComponentModel.DataAnnotations;

namespace ControleGastosAPI.DTOs
{
    public class CriarPessoaDto
    {
        // Representa apenas os dados que o cliente deve enviar
        // para cadastrar uma pessoa, sem expor os relacionamentos internos.
        [Required]
        public string Nome { get; set; }
        [Range(0,120)]
        public int Idade { get; set; }
    }

}
