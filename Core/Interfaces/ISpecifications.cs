using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISpecifications<T>
    {
        Expression<Func<T, bool>>? Criteria { get; }
        Expression<Func<T, object>>? OrderBy { get; }
        Expression<Func<T, object>>? OrderByDescending { get; }
        bool IsDistinct { get; }
        public int Take { get; }
        public int Skip { get; }
        public bool IsPaginationEnabled { get; }
        IQueryable<T> ApplyCriteria(IQueryable<T> query);
    }

    public interface ISpecifications<T, TResult> : ISpecifications<T>
    {
        Expression<Func<T, TResult>>? Select { get; }
    }
}