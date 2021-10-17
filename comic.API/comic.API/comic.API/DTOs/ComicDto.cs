using System;
using System.Collections.Generic;

namespace comic.API.DTOs
{
    public class ComicDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ThumbnailUrl { get; set; }

        public Guid CategoryId { get; set; }
        public CategoryDto Category { get; set; }

        public List<ChapterDto> Chapters { get; set; }

        public List<ComicAuthorDto> ComicAuthors { get; set; }
    }
}
