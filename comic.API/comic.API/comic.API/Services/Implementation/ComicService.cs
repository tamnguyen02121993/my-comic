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

        public async Task<ResponseDataDto<ComicDto>> Get(string search, int page = 1, int pageCount = 20)
        {
            _logger.LogInformation("Get Comics API");
            var query = _dataContext.Comics.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(x => x.Name.Contains(search) || x.Description.Contains(search));
            }

            var count = await query.CountAsync();

            if (page < 1) page = 1;
            if (pageCount < 1) pageCount = 20;

            var comics = await query.Select(c =>
            new ComicDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                ThumbnailUrl = c.ThumbnailUrl,
                CategoryId = c.CategoryId,
                CreatedDate = c.CreatedDate,
                UpdatedDate = c.UpdatedDate,
            })
            .Skip((page - 1) * pageCount)
            .Take(pageCount)
            .ToListAsync();
            _logger.LogInformation("Get Comics Successfully");

            return new ResponseDataDto<ComicDto>
            {
                Data = comics,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageCount = pageCount,
                    TotalCount = count
                }

            };
        }

        public async Task<ComicDto> GetById(string id)
        {
            _logger.LogInformation("GetById Comic API");
            var comic = await _dataContext.FindAsync<Comic>(new Guid(id));
            if (comic == null)
            {
                return null;
            }
            var comicDto = new ComicDto
            {
                Id = comic.Id,
                Name = comic.Name,
                Description = comic.Description,
                CreatedDate = comic.CreatedDate,
                UpdatedDate = comic.UpdatedDate,
                CategoryId = comic.CategoryId,
                ThumbnailUrl = comic.ThumbnailUrl,
            };
            return comicDto;
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
