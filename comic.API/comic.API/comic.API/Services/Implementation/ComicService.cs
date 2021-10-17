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
    public class ComicService : IComicService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<ComicService> _logger;
        public ComicService(DataContext context, ILogger<ComicService> logger)
        {
            _logger = logger;
            _dataContext = context;
        }
        public async Task<bool> Delete(Guid id)
        {
            _logger.LogInformation("Delete Comic API");

            try
            {
                var deleteItem = await _dataContext.FindAsync<Comic>(id);
                if (deleteItem == null)
                {
                    return false;
                }

                _dataContext.Remove(deleteItem);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Delete Comic Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Delete Comic Failure", e.Message);
                return false;
            }
        }

        public async Task<List<ComicDto>> Get()
        {
            _logger.LogInformation("Get Comics API");

            var categories = await _dataContext.Comics.Select(c =>
            new ComicDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                ThumbnailUrl = c.ThumbnailUrl,
                CategoryId = c.CategoryId,
            })
            .ToListAsync();
            _logger.LogInformation("Get Comics Successfully");

            return categories;
        }

        public async Task<ComicDto> Post(ComicDto comicDto)
        {
            _logger.LogInformation("Post Comic API");

            try
            {
                var comic = new Comic
                {
                    Name = comicDto.Name,
                    Description = comicDto.Description,
                    CategoryId = comicDto.CategoryId,
                    ThumbnailUrl = comicDto.ThumbnailUrl,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                };

                await _dataContext.AddAsync(comic);
                await _dataContext.SaveChangesAsync();
                comicDto.Id = comic.Id;

                _logger.LogInformation("Post Comic Successfully");
                return comicDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Post Comic Failure", e.Message);
                return null;
            }
        }

        public async Task<ComicDto> Put(ComicDto comicDto)
        {
            _logger.LogInformation("Put Comic API");

            try
            {
                var comic = await _dataContext.FindAsync<Comic>(comicDto.Id);

                comic.Name = comicDto.Name;
                comic.Description = comicDto.Description;
                comic.ThumbnailUrl = comicDto.ThumbnailUrl;
                comic.CategoryId = comicDto.CategoryId;
                comic.UpdatedDate = DateTime.UtcNow;

                _dataContext.Update(comic);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Put Comic Successfully");
                return comicDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Put Comic Failure", e.Message);
                return null;
            }
        }
    }
}
