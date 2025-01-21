using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Parameters;

namespace Core.Specifications
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductSpecParams specParams) : base(x =>
            (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search)) &&
            (specParams.Brands.Count == 0 || specParams.Brands.Contains(x.Brand)) &&
            (specParams.Types.Count == 0 || specParams.Types.Contains(x.Type))
        )
        {
            switch (specParams.Sort)
            {
                case "PriceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "PriceDesc":
                    AddOrderDescendingBy(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }

            ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
        }
    }
}