using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser
    {
        [StringLength(50, MinimumLength = 2)]
        public string? FirstName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? LastName { get; set; }

        public Address? Address { get; set; }
    }
}