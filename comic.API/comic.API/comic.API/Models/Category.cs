using System;
using System.Collections.Generic;

namespace comic.API.Models
{
    public class Category: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Comic> Comics { get; set; }
    }
}
