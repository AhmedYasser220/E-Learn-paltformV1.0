import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';


@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Student Dashboard Metrics
  
}
