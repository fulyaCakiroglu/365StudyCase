using Domain.Enums;

namespace Application.DTOs;

public class UpdateTaskStatusDto
{
    public TaskState Status { get; set; }
}
