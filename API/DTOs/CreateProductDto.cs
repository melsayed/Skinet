using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be more than 0")]
        public decimal Price { get; set; }

        [Required]
        public string PictureUrl { get; set; } = null!;

        [Required]
        public string Type { get; set; } = null!;

        [Required]
        public string Brand { get; set; } = null!;

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be more than 0")]
        public int QuantityInStock { get; set; }
    }
}