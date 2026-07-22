using ControleGastosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosAPI.Data
{
    // Representa a conexão com o banco de dados e o mapeamento
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Regra de negócio: ao excluir uma Pessoa, todas as suas
            // Transações são excluídas automaticamente (exclusão em cascata).
            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
