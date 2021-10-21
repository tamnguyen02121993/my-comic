using System;
using System.Collections.Generic;

namespace comic.API.DTOs
{
    public class AuthorDto: AuditDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime? Birthday { get; set; }

        public List<ComicAuthorDto> ComicAuthors { get; set; }
    }
}
