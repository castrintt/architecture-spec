import { injectable, inject } from 'inversify';
import { TYPES } from '../../business/ioc/types.js';
import type { ICreateOrderUseCase } from '../../business/application/contracts/interfaces/create-order-use-case.interface.js';
import { CreateOrderInputSchema } from '../../business/application/contracts/types/create-order.types.js';
import { safeParseWithLogging } from '../../utils/schema-validator.js';

export interface HttpRequest {
  body: unknown;
  headers: Record<string, string | undefined>;
}

export interface HttpResponse {
  statusCode: number;
  body: unknown;
}

/**
 * Orders HTTP Controller:
 * Inbound adapter of Clean Architecture. Receives HTTP request,
 * validates incoming payload via Zod with structured logging,
 * and delegates to the Use Case.
 */
@injectable()
export class OrderController {
  constructor(
    @inject(TYPES.CreateOrderUseCase) private readonly createOrderUseCase: ICreateOrderUseCase
  ) {}

  async handleCreate(req: HttpRequest): Promise<HttpResponse> {
    try {
      const validatedInput = safeParseWithLogging(CreateOrderInputSchema, req.body, {
        contextName: 'OrderController.handleCreate',
        severity: 'warn',
        throwOnError: true,
      });

      const result = await this.createOrderUseCase.execute(validatedInput);

      return {
        statusCode: 201,
        body: result,
      };
    } catch (err) {
      return {
        statusCode: 400,
        body: {
          type: 'https://api.company.com/errors/invalid-payload',
          title: 'Invalid Payload',
          status: 400,
          detail: err instanceof Error ? err.message : 'Bad request',
        },
      };
    }
  }
}
