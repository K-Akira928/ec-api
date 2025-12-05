import type { Request, Response } from "express";
import z from "zod";
import { HTTP_STATUS } from "../const/http.ts";
import type { DrizzleDb } from "../db/drizzle/connection.ts";
import { createExampleRequestDto } from "../dto/example/createExampleRequestDto.ts";
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

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const requestDto = createExampleRequestDto.parse(req.body);

      await this.createExampleUsecase.execute(requestDto);

      res.status(HTTP_STATUS.OK).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.issues });
      }
    }
  };
}
