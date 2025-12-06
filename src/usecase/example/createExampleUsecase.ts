import type {
  CreateExampleRequestDto,
  CreateExampleResponseDto,
} from "../../dto/example/createExampleDto.ts";
import type { ExampleRepository } from "../../repository/drizzleExampleRepository.ts";

export class CreateExampleUsecase {
  private exampleRepository: ExampleRepository;

  constructor(exampleRepository: ExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  public execute = async (input: CreateExampleRequestDto): Promise<CreateExampleResponseDto> => {
    const example = {
      name: input.name,
      nickname: input.nickname,
    };

    try {
      await this.exampleRepository.create(example);
    } catch (error) {
      // console.error(error);
      throw error;
    }

    return { success: true };
  };
}
