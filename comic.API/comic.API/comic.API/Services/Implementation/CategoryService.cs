using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using comic.API.Data;
using comic.API.DTOs;
using comic.API.Models;
using comic.API.Services.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comic.API.Services.Implementation
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<CategoryService> _logger;
        public CategoryService(DataContext context, ILogger<CategoryService> logger)
        {
            _logger = logger;
            _dataContext = context;
        }
        public async Task<bool> Delete(Guid id)
        {
            _logger.LogInformation("Delete Category API");

            try
            {
                var deleteItem = await _dataContext.FindAsync<Category>(id);
                if (deleteItem == null)
                {
                    return false;
                }

                _dataContext.Remove(deleteItem);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Delete Category Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Delete Category Failure", e.Message);
                return false;
            }
        }

        public async Task<List<CategoryDto>> Get()
        {
            _logger.LogInformation("Get Categories API");

            var categories = await _dataContext.Categories.Select(c =>
            new CategoryDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
            })
            .ToListAsync();
            _logger.LogInformation("Get Categories Successfully");

            return categories;
        }

        public async Task<CategoryDto> Post(CategoryDto categoryDto)
        {
            _logger.LogInformation("Post Category API");

            try
            {
                var category = new Category
                {
                    Name = categoryDto.Name,
                    Description = categoryDto.Description,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                };

                await _dataContext.AddAsync(category);
                await _dataContext.SaveChangesAsync();
                categoryDto.Id = category.Id;

                _logger.LogInformation("Post Category Successfully");
                return categoryDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Post Category Failure", e.Message);
                return null;
            }
        }

        public async Task<CategoryDto> Put(CategoryDto categoryDto)
        {
            _logger.LogInformation("Put Category API");

            try
            {
                var category = await _dataContext.FindAsync<Category>(categoryDto.Id);

                category.Name = categoryDto.Name;
                category.Description = categoryDto.Description;
                category.UpdatedDate = DateTime.UtcNow;

                _dataContext.Update(category);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Put Category Successfully");
                return categoryDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Put Category Failure", e.Message);
                return null;
            }
        }
    }
}
