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
    public class AuthorService : IAuthorService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<AuthorService> _logger;
        public AuthorService(DataContext context, ILogger<AuthorService> logger)
        {
            _logger = logger;
            _dataContext = context;
        }
        public async Task<bool> Delete(Guid id)
        {
            _logger.LogInformation("Delete Author API");

            try
            {
                var deleteItem = await _dataContext.FindAsync<Author>(id);
                if (deleteItem == null)
                {
                    return false;
                }

                _dataContext.Remove(deleteItem);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Delete Author Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Delete Author Failure", e.Message);
                return false;
            }
        }

        public async Task<List<AuthorDto>> Get()
        {
            _logger.LogInformation("Get Authors API");

            var authors = await _dataContext.Authors.Select(c =>
            new AuthorDto
            {
                Id = c.Id,
                Name = c.Name,
                Summary = c.Summary,
                AvatarUrl = c.AvatarUrl,
                Birthday = c.Birthday
            })
            .ToListAsync();
            _logger.LogInformation("Get Authors Successfully");

            return authors;
        }

        public async Task<AuthorDto> Post(AuthorDto authorDto)
        {
            _logger.LogInformation("Post Author API");

            try
            {
                var author = new Author
                {
                    Name = authorDto.Name,
                    Summary = authorDto.Summary,
                    AvatarUrl = authorDto.AvatarUrl,
                    Birthday = authorDto.Birthday,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                };

                await _dataContext.AddAsync(author);
                await _dataContext.SaveChangesAsync();
                authorDto.Id = author.Id;

                _logger.LogInformation("Post Author Successfully");
                return authorDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Post Author Failure", e.Message);
                return null;
            }
        }

        public async Task<AuthorDto> Put(AuthorDto authorDto)
        {
            _logger.LogInformation("Put Author API");

            try
            {
                var author = await _dataContext.FindAsync<Author>(authorDto.Id);

                author.Name = authorDto.Name;
                author.Summary = authorDto.Summary;
                author.AvatarUrl = authorDto.AvatarUrl;
                author.Birthday = authorDto.Birthday;
                author.UpdatedDate = DateTime.UtcNow;

                _dataContext.Update(author);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Put Author Successfully");
                return authorDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Put Author Failure", e.Message);
                return null;
            }
        }
    }
}
