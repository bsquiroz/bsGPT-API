import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
} from './use-cases';
import { OrtographyDto, ProsConsDiscusserDto } from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async ortographyCheck(ortographyDto: OrtographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: ortographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }
}
