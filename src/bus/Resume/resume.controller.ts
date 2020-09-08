// Core
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

// Services
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
    constructor(
        private readonly resumeService: ResumeService,
    ) {}

    @Get()
    async getResume(
        @Res() res: Response,
    ): Promise<Response> {
        const buffer = await this.resumeService.generateResumePDF();
        const stream = this.resumeService.getReadableStream(buffer);

        res.set({
            'Content-Type':   'application/pdf',
            'Content-Length': buffer.length,
        });

        return stream.pipe(res);
    }
}
