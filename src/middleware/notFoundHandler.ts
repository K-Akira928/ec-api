import type { NextFunction, Request, Response } from "express";
import { ERROR_CODE, HTTP_STATUS } from "../const/http.ts";
import type { NotFoundErrorDto } from "../dto/share/apiResponseDto.ts";

export const notFoundHandler = (req: Request, res: Response, _: NextFunction) => {
  const response: NotFoundErrorDto = {
    success: false,
    error: {
      code: ERROR_CODE.NOT_FOUND,
      message: `Cannot ${req.method} ${req.originalUrl}. The requested was not found.`,
    },
  };

  return res.status(HTTP_STATUS.NOT_FOUND).json(response);
};
