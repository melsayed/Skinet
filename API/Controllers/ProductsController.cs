using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductRepository repo) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string? brand, string? type, string? sort)
        {
            return Ok(await repo.GetProductsAsync(brand, type, sort));
        }


        [HttpGet("{id:int}", Name = "GetProduct")]
        public async Task<ActionResult<Product?>> GetProduct(int id)
        {
            var product = await repo.GetProductByIdAsync(id);
            if (product is null)
                return NotFound();
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string?>>> GetBrands() => Ok(await repo.GetBrandsAsync());

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string?>>> GetTypes() => Ok(await repo.GetTypesAsync());


        [HttpPost]
        public async Task<ActionResult<Product?>> CreateProduct(Product product)
        {
            repo.AddProduct(product);

            if (await repo.SaveChangesAsync())
                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);

            return BadRequest("Problem creating the product");
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !repo.ProductExists(id))
                return BadRequest("Can not update this product");

            repo.UpdateProduct(product);
            if (await repo.SaveChangesAsync())
                return NoContent();

            return BadRequest("Problem updating the product");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            Product? product = await repo.GetProductByIdAsync(id);
            if (product is not { })
                return NotFound();

            repo.DeleteProduct(product);
            if (await repo.SaveChangesAsync())
                return NoContent();

            return BadRequest("Problem deleting the product");
        }
    }
}