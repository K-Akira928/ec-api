import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../const/http.ts";
import type { DrizzleDb } from "../db/connection.ts";
import {
  type CreateExampleResponseDto,
  createExampleRequestDto,
} from "../dto/example/createExampleDto.ts";
import { DrizzleExampleRepository } from "../repository/drizzleExampleRepository.ts";
import { CreateExampleUsecase } from "../usecase/example/createExampleUsecase.ts";

export class ExampleController {
  private readonly createExampleUsecase: CreateExampleUsecase;

  constructor(createExampleUsecase: CreateExampleUsecase) {
    this.createExampleUsecase = createExampleUsecase;
  }

  public static build = (db: DrizzleDb) => {
    const exampleRepository = new DrizzleExampleRepository(db);
    const createExampleUsecase = new CreateExampleUsecase(exampleRepository);

    return new ExampleController(createExampleUsecase);
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestDto = createExampleRequestDto.parse(req.body);

      await this.createExampleUsecase.execute(requestDto);

      const response: CreateExampleResponseDto = { success: true };

      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  };
}
