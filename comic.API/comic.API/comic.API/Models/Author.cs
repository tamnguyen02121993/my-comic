using System;
using System.Collections.Generic;

namespace comic.API.Models
{
    public class Author: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime? Birthday { get; set; }

        public List<ComicAuthor> ComicAuthors { get; set; }
        public ICollection<Comic> Comics { get; set; }
    }
}
