using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Parameters;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(IGenericRepository<Product> repo) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<Pagination<Product>>> GetProducts([FromQuery] ProductSpecParams specParams)
        {
            var spec = new ProductSpecification(specParams);
            
            return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);

        }


        [HttpGet("{id:int}", Name = "GetProduct")]
        public async Task<ActionResult<Product?>> GetProduct(int id)
        {
            var product = await repo.GetByIdAsync(id);
            if (product is null)
                return NotFound();
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string?>>> GetBrands() => Ok(await repo.ListAsync(new BrandListSpecification()));

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string?>>> GetTypes() => Ok(await repo.ListAsync(new TypeListSpecification()));


        [HttpPost]
        public async Task<ActionResult<Product?>> CreateProduct(Product product)
        {
            repo.Add(product);

            if (await repo.SaveAllAsync())
                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);

            return BadRequest("Problem creating the product");
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !repo.Exists(id))
                return BadRequest("Can not update this product");

            repo.Update(product);
            if (await repo.SaveAllAsync())
                return NoContent();

            return BadRequest("Problem updating the product");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            Product? product = await repo.GetByIdAsync(id);
            if (product is not { })
                return NotFound();

            repo.Delete(product);
            if (await repo.SaveAllAsync())
                return NoContent();

            return BadRequest("Problem deleting the product");
        }
    }
}