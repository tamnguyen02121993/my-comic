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
    public class ComicImageService : IComicImageService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<ComicImageService> _logger;
        public ComicImageService(DataContext context, ILogger<ComicImageService> logger)
        {
            _logger = logger;
            _dataContext = context;
        }
        public async Task<bool> Delete(Guid id)
        {
            _logger.LogInformation("Delete ComicImage API");

            try
            {
                var deleteItem = await _dataContext.FindAsync<ComicImage>(id);
                if (deleteItem == null)
                {
                    return false;
                }

                _dataContext.Remove(deleteItem);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Delete ComicImage Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Delete ComicImage Failure", e.Message);
                return false;
            }
        }

        public async Task<ResponseDataDto<ComicImageDto>> Get(string search, int page = 1, int pageCount = 20)
        {
            _logger.LogInformation("Get ComicImages API");
            var query = _dataContext.ComicImages.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(x => x.Url.Contains(search));
            }

            var count = await query.CountAsync();

            if (page < 1) page = 1;
            if (pageCount < 1) pageCount = 20;
            var comicImages = await query.Select(c =>
            new ComicImageDto
            {
                Id = c.Id,
                ChapterId = c.ChapterId,
                Url = c.Url,
                CreatedDate = c.CreatedDate,
                UpdatedDate = c.UpdatedDate
            })
            .Skip((page - 1) * pageCount)
            .Take(pageCount)
            .ToListAsync();
            _logger.LogInformation("Get ComicImages Successfully");

            return new ResponseDataDto<ComicImageDto>
            {
                Data = comicImages,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageCount = pageCount,
                    TotalCount = count
                }

            };
        }

        public async Task<ComicImageDto> GetById(string id)
        {
            _logger.LogInformation("GetById Comic Image API");
            var image = await _dataContext.FindAsync<ComicImage>(new Guid(id));
            if (image == null)
            {
                return null;
            }
            var imageDto = new ComicImageDto
            {
                Id = image.Id,
                CreatedDate = image.CreatedDate,
                UpdatedDate = image.UpdatedDate,
                ChapterId = image.ChapterId,
                Url = image.Url,
            };
            return imageDto;
        }

        public async Task<bool> Post(ComicImageDto comicImageDto)
        {
            _logger.LogInformation("Post ComicImage API");

            try
            {
                var urls = comicImageDto.Url.Split('\n', StringSplitOptions.RemoveEmptyEntries);
                var links = urls.Select(x => new ComicImage
                {
                    ChapterId = comicImageDto.ChapterId,
                    Url = x,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                });
                await _dataContext.AddRangeAsync(links);
                await _dataContext.SaveChangesAsync();

                _logger.LogInformation("Post ComicImage Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Post ComicImage Failure", e.Message);
                return false;
            }
        }

        public async Task<bool> Put(ComicImageDto comicImageDto)
        {
            _logger.LogInformation("Put ComicImage API");

            try
            {
                var comicImage = await _dataContext.FindAsync<ComicImage>(comicImageDto.Id);

                comicImage.Url = comicImageDto.Url;
                comicImage.ChapterId = comicImageDto.ChapterId;
                comicImage.UpdatedDate = DateTime.UtcNow;

                _dataContext.Update(comicImage);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Put ComicImage Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Put ComicImage Failure", e.Message);
                return false;
            }
        }
    }
}
