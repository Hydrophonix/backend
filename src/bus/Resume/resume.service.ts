// Core
import { Injectable } from '@nestjs/common';
import { create, CreateOptions } from 'html-pdf';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

@Injectable()
export class ResumeService {
    private readonly options: CreateOptions = {
        format: 'A4',
        base:   `file:///${path.resolve('assets').replace(/\\/g, '/')}/`,
    }

    private getResumeHtml() {
        return fs.readFileSync(path.join(__dirname, '../../../assets/resume.html'), 'utf-8');
    }

    generateResumePDF() {
        const template = this.getResumeHtml();
        const html = template.replace('${}$', new Date().toLocaleString());

        return new Promise<Buffer>((resolve, reject) => {
            create(html, this.options).toBuffer((error, buffer) => {
                if (error) {
                    reject(error);
                }
                resolve(buffer);
            });
        });
    }

    getReadableStream(buffer: Buffer): Readable {
        const stream = new Readable();

        stream.push(buffer);
        stream.push(null);

        return stream;
    }
}
