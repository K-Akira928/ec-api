import type { CreateExampleRequestDto } from "../../dto/example/createExampleRequestDto.ts";

export class CreateExampleUsecase {
  execute = async (input: CreateExampleRequestDto): Promise<void> => {};
}
