import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { Roles , Role} from '../auth//decorators/roles.decorator'; 
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

  const canAccess = await this.modulesService.canAccessModule(studentPerformance, module_id);

  if (!canAccess) {
    throw new BadRequestException('Access denied: Your performance does not meet the module requirements.');
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

}
