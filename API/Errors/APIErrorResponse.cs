using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class APIErrorResponse(int statusCode, string message, string? Details)
    {
        public int StatusCode { get; set; } = statusCode;
        public string Message { get; set; } = message;
        public string? Details { get; set; } = Details;
    }
}