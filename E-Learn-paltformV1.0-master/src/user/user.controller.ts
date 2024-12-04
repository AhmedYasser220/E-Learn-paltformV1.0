import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './Models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a user
  @Post()
  async create(@Body() user: Partial<User>) {
    if (user.role && !['admin', 'student', 'instructor'].includes(user.role)) {
      return { error: 'Invalid role. Role must be admin, student, or instructor.' };
    }
    return this.userService.create(user);
  }

  // Get all users
  @Get()
  async findAll(@Body() body: { role?: string }) {
    const { role } = body;
    if (role) {
      if (!['admin', 'student', 'instructor'].includes(role)) {
        return { error: 'Invalid role. Role must be admin, student, or instructor.' };
      }
      return this.userService.findAllByRole(role);
    }
    return this.userService.findAll();
  }

  // Get a user by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // Update a user by ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<User>) {
    if (updates.role && !['admin', 'student', 'instructor'].includes(updates.role)) {
      return { error: 'Invalid role. Role must be admin, student, or instructor.' };
    }
    return this.userService.update(id, updates);
  }

  // Delete a user by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
