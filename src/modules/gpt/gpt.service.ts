import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrtographyDto } from './dtos';

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
}
