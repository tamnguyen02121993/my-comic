using Microsoft.EntityFrameworkCore;
using comic.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comic.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Comic> Comics { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<ComicAuthor> ComicAuthors { get; set; }
        public DbSet<ComicImage> ComicImages { get; set; }
        public DbSet<Author> Authors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Comic>()
                        .HasMany(c => c.Authors)
                        .WithMany(a => a.Comics)
                        .UsingEntity<ComicAuthor>(
                b => b.HasOne(ca => ca.Author)
                        .WithMany(a => a.ComicAuthors)
                        .HasForeignKey(ca => ca.AuthorId)
                        .OnDelete(DeleteBehavior.Cascade),
                b => b.HasOne(ca => ca.Comic)
                        .WithMany(c => c.ComicAuthors)
                        .HasForeignKey(ca => ca.ComicId)
                        .OnDelete(DeleteBehavior.Cascade));
        }
    }
}
