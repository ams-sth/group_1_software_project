using Microsoft.AspNetCore.Identity;

namespace SplitSync.Api.Models;

public class AppUser : IdentityUser
{
    public bool NotificationsEnabled { get; set; } = true;
}
