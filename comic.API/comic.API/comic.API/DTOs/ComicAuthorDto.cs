using System;

namespace comic.API.DTOs
{
    public class ComicAuthorDto
    {
        public Guid ComicId { get; set; }
        public ComicDto Comic { get; set; }

        public Guid AuthorId { get; set; }
        public AuthorDto Author { get; set; }
    }
}
