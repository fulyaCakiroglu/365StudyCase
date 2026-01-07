using Application.DTOs;
using Domain.Enums;

namespace Application.Interfaces;

public interface ITaskService
{
    Task<List<TaskListDto>> GetAllAsync();
    Task<TaskListDto> CreateAsync(TaskCreateDto dto);
    Task UpdateStatusAsync(int id, TaskState status);
}
