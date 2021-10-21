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
    public class ChapterService : IChapterService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<ChapterService> _logger;
        public ChapterService(DataContext context, ILogger<ChapterService> logger)
        {
            _logger = logger;
            _dataContext = context;
        }
        public async Task<bool> Delete(Guid id)
        {
            _logger.LogInformation("Delete Chapter API");

            try
            {
                var deleteItem = await _dataContext.FindAsync<Chapter>(id);
                if (deleteItem == null)
                {
                    return false;
                }

                _dataContext.Remove(deleteItem);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Delete Chapter Successfully");
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("Delete Chapter Failure", e.Message);
                return false;
            }
        }

        public async Task<ResponseDataDto<ChapterDto>> Get(string search, int page = 1, int pageCount = 20)
        {
            _logger.LogInformation("Get Chapters API");

            var query = _dataContext.Chapters.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(x => x.Name.Contains(search) || x.Description.Contains(search));
            }

            var count = await query.CountAsync();

            if (page < 1) page = 1;
            if (pageCount < 1) pageCount = 20;

            var chapters = await query.Select(c =>
            new ChapterDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                ComicId = c.ComicId,
                CreatedDate = c.CreatedDate,
                UpdatedDate = c.UpdatedDate
            })
            .Skip((page - 1) * pageCount)
            .Take(pageCount)
            .ToListAsync();
            _logger.LogInformation("Get Chapters Successfully");

            return new ResponseDataDto<ChapterDto>
            {
                Data = chapters,
                Pagination = new PaginationDto
                {
                    Page = page,
                    PageCount = pageCount,
                    TotalCount = count
                }

            };
        }

        public async Task<List<ChapterDto>> GetByComicId(string comicId)
        {
            _logger.LogInformation("Get Chapters By ComicId API");

            var query = _dataContext.Chapters.AsQueryable();

            var chapters = await query.Where(x => x.ComicId.ToString() == comicId).Select(c =>
            new ChapterDto
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name,
                ComicId = c.ComicId,
                CreatedDate = c.CreatedDate,
                UpdatedDate = c.UpdatedDate
            })
            .ToListAsync();
            _logger.LogInformation("Get Chapters Successfully");

            return chapters;
        }

        public async Task<ChapterDto> GetById(string id)
        {
            _logger.LogInformation("GetById Chapter API");
            var chapter = await _dataContext.FindAsync<Chapter>(new Guid(id));
            if (chapter == null)
            {
                return null;
            }
            var chapterDto = new ChapterDto
            {
                Id = chapter.Id,
                Name = chapter.Name,
                Description = chapter.Description,
                CreatedDate = chapter.CreatedDate,
                UpdatedDate = chapter.UpdatedDate,
                ComicId = chapter.ComicId
            };
            return chapterDto;
        }
        public async Task<ChapterDto> Post(ChapterDto chapterDto)
        {
            _logger.LogInformation("Post Chapter API");

            try
            {
                var chapter = new Chapter
                {
                    Name = chapterDto.Name,
                    Description = chapterDto.Description,
                    ComicId = chapterDto.ComicId,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                };

                await _dataContext.AddAsync(chapter);
                await _dataContext.SaveChangesAsync();
                chapterDto.Id = chapter.Id;

                _logger.LogInformation("Post Chapter Successfully");
                return chapterDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Post Chapter Failure", e.Message);
                return null;
            }
        }

        public async Task<ChapterDto> Put(ChapterDto chapterDto)
        {
            _logger.LogInformation("Put Chapter API");

            try
            {
                var chapter = await _dataContext.FindAsync<Chapter>(chapterDto.Id);

                chapter.Name = chapterDto.Name;
                chapter.Description = chapterDto.Description;
                chapter.ComicId = chapterDto.ComicId;
                chapter.UpdatedDate = DateTime.UtcNow;

                _dataContext.Update(chapter);
                await _dataContext.SaveChangesAsync();
                _logger.LogInformation("Put Chapter Successfully");
                return chapterDto;
            }
            catch (Exception e)
            {
                _logger.LogError("Put Chapter Failure", e.Message);
                return null;
            }
        }
    }
}
