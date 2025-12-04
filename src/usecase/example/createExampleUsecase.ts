import type { CreateExampleRequestDto } from "../../dto/example/createExampleRequestDto.ts";
import type { DrizzleExampleRepository } from "../../repository/drizzleExampleRepository.ts";

export class CreateExampleUsecase {
  private exampleRepository: DrizzleExampleRepository;

  constructor(exampleRepository: DrizzleExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  public execute = async (input: CreateExampleRequestDto): Promise<void> => {
    const example = {
      name: input.name,
      nickname: input.nickname,
    };

    this.exampleRepository.create(example);
  };
}
