using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return Ok(await _context.Products.ToListAsync());
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Product?>> GetProduct(int id)
        {
            var product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id);
            if (product is null)
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product?>> AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !ProductExist(id))
                return BadRequest("Can not update this product");

            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            Product? product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id);

            if (product is not { })
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ProductExist(int id) => _context.Products.Any(p => p.Id == id);
    }
}