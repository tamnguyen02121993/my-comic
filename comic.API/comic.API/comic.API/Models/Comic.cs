using System;
using System.Collections.Generic;

namespace comic.API.Models
{
    public class Comic: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ThumbnailUrl { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        public List<Chapter> Chapters { get; set; }

        public List<ComicAuthor> ComicAuthors { get; set; }
        public ICollection<Author> Authors { get; set; }
    }
}
