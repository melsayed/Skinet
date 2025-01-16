using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> SaveAllAsync();
        bool Exists(int id);
        Task<IReadOnlyList<T>?> ListAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task<T?> GetEntityWithSpec(ISpecifications<T> spec);
        Task<IReadOnlyList<T>?> ListAsync(ISpecifications<T> spec);
        
        //For Projection
        Task<TResult?> GetEntityWithSpec<TResult>(ISpecifications<T, TResult> spec);
        Task<IReadOnlyList<TResult>?> ListAsync<TResult>(ISpecifications<T, TResult> spec);
    }
}