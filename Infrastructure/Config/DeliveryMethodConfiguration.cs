using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class DeliveryMethodConfiguration : IEntityTypeConfiguration<DeliveryMethod>
    {
        public void Configure(EntityTypeBuilder<DeliveryMethod> builder)
        {
            builder.Property(x => x.ShortName).HasColumnType("nvarchar(20)");
            builder.Property(x => x.DeliveryTime).HasColumnType("nvarchar(30)");
            builder.Property(x => x.Description).HasColumnType("nvarchar(200)");
            builder.Property(x => x.Price).HasColumnType("decimal(18,2)");
        }
    }
}