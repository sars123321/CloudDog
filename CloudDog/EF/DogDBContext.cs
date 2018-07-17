using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudDog.EF
{
    public class DogDBContext : DbContext
    {
        public DogDBContext(DbContextOptions<DogDBContext> options) : base(options)
        {

        }

        public DbSet<Image> Image { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Image>().ToTable("Image");
        }
    }
}
