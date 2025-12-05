import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ERROR_CODE, HTTP_STATUS } from "../const/http.ts";
import type {
  InternalErrorDto,
  InvalidParamsDto,
  ValidationErrorDto,
} from "../dto/share/apiResponseDto.ts";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ZodError) {
    const invalidParams: InvalidParamsDto[] = err.issues.map((issue) => ({
      name: issue.path.join("."),
      reason: issue.message,
    }));

    const response: ValidationErrorDto = {
      success: false,
      error: {
        code: ERROR_CODE.VALIDATION,
        message: "One or more fields failed validation checks.",
        invalidParams: invalidParams,
      },
    };

    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }

  const response: InternalErrorDto = {
    success: false,
    error: {
      code: ERROR_CODE.INTERNAL,
      message: "An unexpected error occurred.",
    },
  };

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
};
