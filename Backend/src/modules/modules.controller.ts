import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { Roles, Role } from '../auth//decorators/roles.decorator';
import { CreateModuleDto } from './dto/createModule.dto';
import { UpdateModuleDto } from './dto/updateModule.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  // to see if this student can acces the module or not

  @Get('access/:module_id')
  async checkModuleAccess(
    @Param('module_id') module_id: string,
    @Query('studentPerformance') studentPerformance: number,
  ) {
    if (studentPerformance === undefined) {
      throw new BadRequestException('Missing student performance value');
    }

    const canAccess = await this.modulesService.canAccessModule(
      studentPerformance,
      module_id,
    );

    if (!canAccess) {
      throw new BadRequestException(
        'Access denied: Your performance does not meet the module requirements.',
      );
    }

    return { message: 'Access granted' };
  }

  // to get the student avaliable modules (based on performance)
  @Roles(Role.Student)
  @Get('available')
  async getAvailableModules(@Query('performance') performance: number) {
    if (performance === undefined) {
      throw new BadRequestException('Performance metric is required');
    }
    return this.modulesService.getModulesByPerformance(performance);
  }
  @Roles(Role.Instructor)
  // to add Questions
  @Post('add-question')
  async addQuestion(@Body() questionDto: AddQuestionDto) {
    return this.modulesService.addQuestionToBank(questionDto);
  }

  @Post()
  async createModule(@Body() moduleData: CreateModuleDto) {
    try {
      return await this.modulesService.create(moduleData);
    } catch (error) {
      throw new HttpException(
        'Failed to create module',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get the modules by course id that i customed
  @Get(':courseId')
  async getModulesByCourseId(@Param('courseId') courseId: string) {
    try {
      return await this.modulesService.findAll(courseId);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve modules',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //get the module with the id of mongo
  //URL:http://localhost:3000/modules/module/675de0d42400e58c6e760906   <= eg
  @Get('module/:moduleId')
  async getModuleById(@Param('moduleId') moduleId: string) {
    try {
      return await this.modulesService.findById(moduleId);
    } catch (error) {
      throw new HttpException('Module not found', HttpStatus.NOT_FOUND);
    }
  }
  //update the module with the id of mongodb
  // URL: http://localhost:3000/modules/675de0d42400e58c6e760906 <= eg
  @Put(':moduleId')
  async updateModule(
    @Param('moduleId') moduleId: string,
    @Body() updateData: UpdateModuleDto,
  ) {
    try {
      return await this.modulesService.update(moduleId, updateData);
    } catch (error) {
      throw new HttpException(
        'Failed to update module',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //Delete the module with the id of mongodb
  // URL: http://localhost:3000/modules/675de0d42400e58c6e760906 <= eg
  @Delete(':moduleId')
  async deleteModule(@Param('moduleId') moduleId: string) {
    try {
      await this.modulesService.delete(moduleId);
      return { message: 'Module deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete module',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':moduleId/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('moduleId') moduleId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const filePath = `uploads/${file.filename}`;
    await this.modulesService.addFileToModule(moduleId, filePath);

    return { message: 'File uploaded successfully', filePath };
  }
}
