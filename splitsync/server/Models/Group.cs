namespace SplitSync.Api.Models;

public class Group
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string CreatorId { get; set; } = string.Empty;
    public AppUser Creator { get; set; } = null!;

    public ICollection<GroupMember> Members { get; set; } = new List<GroupMember>();
}
