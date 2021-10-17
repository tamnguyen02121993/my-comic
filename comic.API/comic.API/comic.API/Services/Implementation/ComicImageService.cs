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

        public async Task<List<ComicImageDto>> Get()
        {
            _logger.LogInformation("Get ComicImages API");

            var categories = await _dataContext.ComicImages.Select(c =>
            new ComicImageDto
            {
                Id = c.Id,
                ChapterId = c.ChapterId,
                Url = c.Url,
            })
            .ToListAsync();
            _logger.LogInformation("Get ComicImages Successfully");

            return categories;
        }

        public async Task<ComicImageDto> Post(ComicImageDto comicImageDto)
        {
            _logger.LogInformation("Post ComicImage API");

            try
            {
                var comicImage = new ComicImage
                {
                    ChapterId = comicImageDto.ChapterId,
                    Url = comicImageDto.Url,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                };

                await _dataContext.AddAsync(comicImage);
                await _dataContext.SaveChangesAsync();
                comicImageDto.Id = comicImage.Id;

                _logger.LogInformation("Post ComicImage Successfully");
                return comicImageDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Post ComicImage Failure", e.Message);
                return null;
            }
        }

        public async Task<ComicImageDto> Put(ComicImageDto comicImageDto)
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
                return comicImageDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Put ComicImage Failure", e.Message);
                return null;
            }
        }
    }
}
