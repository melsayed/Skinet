using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AddressDto
    {
        [Required(ErrorMessage = "Line1 is Required")]
        public string Line1 { get; set; } = null!;
        public string? Line2 { get; set; } = string.Empty;
        [Required(ErrorMessage = "City is Required")]
        public string City { get; set; } = null!;
        [Required(ErrorMessage = "State is Required")]
        public string State { get; set; } = null!;
        [Required(ErrorMessage = "PostalCode is Required")]
        public string PostalCode { get; set; } = null!;
        [Required(ErrorMessage = "Country is Required")]
        public string Country { get; set; } = null!;
    }
}