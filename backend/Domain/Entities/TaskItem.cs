using Domain.Enums;

namespace Domain.Entities;

public class TaskItem
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public TaskState Status { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsDeleted { get; set; } = false;
}
