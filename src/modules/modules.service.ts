import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modules } from './Model/modules.model';
import { CreateModuleDto } from './dto/createModule.dto';
import { UpdateModuleDto } from './dto/updateModule.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(modules.name) private readonly modulesModel: Model<modules>,
  ) {}

  async create(moduleData: CreateModuleDto): Promise<modules> {
    const newModule = new this.modulesModel(moduleData);
    return await newModule.save();
  }

  async findAll(courseId: string): Promise<modules[]> {
    return this.modulesModel.find({ course_id: courseId });
  }

  async findById(moduleId: string): Promise<modules> {
    const module = await this.modulesModel.findById(moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module;
  }

  async update(
    moduleId: string,
    updateData: UpdateModuleDto,
  ): Promise<modules> {
    const updatedModule = await this.modulesModel.findByIdAndUpdate(
      moduleId,
      updateData,
      { new: true },
    );
    if (!updatedModule) {
      throw new NotFoundException('Module not found');
    }
    return updatedModule;
  }

  async delete(moduleId: string): Promise<void> {
    const deletedModule = await this.modulesModel.findByIdAndDelete(moduleId);
    if (!deletedModule) {
      throw new NotFoundException('Module not found');
    }
  }

  
async addFileToModule(moduleId: string, filePath: string): Promise<void> {
  const module = await this.modulesModel.findById(moduleId);
  if (!module) {
    throw new Error('Module not found');
  }
  module.resources = module.resources || [];
  module.resources.push(filePath);
  await module.save();
}

}
