using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Address : BaseEntity
    {
        [Column(TypeName = "nvarchar(250)")]
        public required string Line1 { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string? Line2 { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public required string City { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public required string State { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public required string PostalCode { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public required string Country { get; set; }
    }
}