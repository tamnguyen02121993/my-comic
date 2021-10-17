using System;

namespace comic.API.Models
{
    public class ComicAuthor
    {
        public Guid ComicId { get; set; }
        public Comic Comic { get; set; }

        public Guid AuthorId { get; set; }
        public Author Author { get; set; }
    }
}
