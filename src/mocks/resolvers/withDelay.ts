import {
  type PathParams,
  type DefaultBodyType,
  type HttpResponseResolver,
  delay,
} from "msw";

export function withDelay<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay(500);
    return resolver(...args);
  };
}
