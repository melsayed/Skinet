using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Interfaces;

namespace Core.Specifications
{
    public class BaseSpecification<T>(Expression<Func<T, bool>>? criteria) : ISpecifications<T>
    {
        public BaseSpecification() : this(null) { }
        public Expression<Func<T, bool>>? Criteria => criteria;
        public Expression<Func<T, object>>? OrderBy { get; private set; }
        public Expression<Func<T, object>>? OrderByDescending { get; private set; }

        public bool IsDistinct { get; private set; }

        public int Take { get; private set; }

        public int Skip { get; private set; }

        public bool IsPaginationEnabled { get; private set; }

        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }
        protected void AddOrderDescendingBy(Expression<Func<T, object>> orderByDescendingExpression)
        {
            OrderByDescending = orderByDescendingExpression;
        }

        protected void ApplyDistinct()
        {
            IsDistinct = true;
        }

        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPaginationEnabled = true;
        }

        public IQueryable<T> ApplyCriteria(IQueryable<T> query)
        {
            if (Criteria != null)
                query = query.Where(Criteria);
            
            return query;
        }
    }

    public class BaseSpecification<T, TResult>(Expression<Func<T, bool>>? criteria) : BaseSpecification<T>(criteria), ISpecifications<T, TResult>
    {
        public BaseSpecification() : this(null) { }
        public Expression<Func<T, TResult>>? Select { get; private set; }

        protected void AddSelect(Expression<Func<T, TResult>> selectExpression)
        {
            Select = selectExpression;
        }
    }
}