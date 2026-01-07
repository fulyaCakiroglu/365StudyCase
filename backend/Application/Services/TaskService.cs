using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskListDto>> GetAllAsync()
    {
        return await _context.Tasks
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new TaskListDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Status = x.Status,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<TaskListDto> CreateAsync(TaskCreateDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = TaskState.Pending,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return new TaskListDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            CreatedAt = task.CreatedAt
        };
    }

    public async Task UpdateStatusAsync(int id, TaskState status)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (task == null)
            throw new Exception("Task not found");

        task.Status = status;
        await _context.SaveChangesAsync();
    }
}
