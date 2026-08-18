import { Response } from "express";
import { ApiMeta, ApiSuccessResponse } from "../types/api";

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: ApiMeta
): void {
  const body: ApiSuccessResponse<T> = { success: true, data };
  if (meta) body.meta = meta;
  res.status(statusCode).json(body);
}

export function sendList<T>(
  res: Response,
  data: T[],
  statusCode = 200,
  extraMeta?: ApiMeta
): void {
  sendSuccess(res, data, statusCode, { count: data.length, ...extraMeta });
}
