using Microsoft.AspNetCore.Identity;

namespace RecruitmentAPI.Models
{
    public class AppUser:IdentityUser
    {
        public string? FullName { get; set; }
    }
}
