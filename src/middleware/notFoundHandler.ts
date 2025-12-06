import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../const/http.ts";
import { createNotFoundErrorResponseDto } from "../dto/share/notFoundErrorResponseDto.ts";

export const notFoundHandler = (req: Request, res: Response, _: NextFunction) => {
  const response = createNotFoundErrorResponseDto(req.method, req.originalUrl);

  return res.status(HTTP_STATUS.NOT_FOUND).json(response);
};
