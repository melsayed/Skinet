using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Parameters
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set { _pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }

        private List<string> _brands = [];
        public List<string> Brands
        {
            get => _brands; //Angular,React
            set { _brands = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList(); }
        }

        private List<string> _types = [];
        public List<string> Types
        {
            get => _types; //Angular,React
            set { _types = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList(); }
        }

        public string? Sort { get; set; } = null;

        private string? _search;
        public string? Search
        {
            get => _search ?? "";
            set => _search = value ?? "".ToLower();
        }
    }
}