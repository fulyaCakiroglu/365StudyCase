using Domain.Enums;

namespace Application.DTOs;

public class TaskListDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public TaskState Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
