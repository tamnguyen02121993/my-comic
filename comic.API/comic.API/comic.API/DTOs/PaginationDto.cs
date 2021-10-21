using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comic.API.DTOs
{
    public class PaginationDto
    {
        public int Page { get; set; }
        public int PageCount { get; set; }
        public int TotalCount { get; set; }
    }
}
