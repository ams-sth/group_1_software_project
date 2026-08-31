using System.Text;
using Microsoft.AspNetCore.Identity;
using SplitSync.Api.Models;

namespace SplitSync.Api.Services;

public class UsernameGenerator(UserManager<AppUser> userManager)
{
    public async Task<string> GenerateAsync(string email)
    {
        var localPart = email.Split('@')[0];
        var baseName = Sanitize(localPart);
        if (baseName.Length == 0)
        {
            baseName = "user";
        }

        var candidate = baseName;
        var random = new Random();
        while (await userManager.FindByNameAsync(candidate) is not null)
        {
            candidate = $"{baseName}{random.Next(1000, 9999)}";
        }

        return candidate;
    }

    private static string Sanitize(string value)
    {
        var builder = new StringBuilder();
        foreach (var c in value)
        {
            if (char.IsLetterOrDigit(c))
            {
                builder.Append(char.ToLowerInvariant(c));
            }
        }
        return builder.ToString();
    }
}
