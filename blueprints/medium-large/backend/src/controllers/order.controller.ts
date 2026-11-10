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
 * Controller HTTP de Pedidos:
 * Adaptador de entrada da Clean Architecture. Recebe a requisição,
 * valida rigidamente o payload via Zod com logging estruturado,
 * e delega para o Caso de Uso.
 */
@injectable()
export class OrderController {
  constructor(
    @inject(TYPES.CreateOrderUseCase) private readonly createOrderUseCase: ICreateOrderUseCase
  ) {}

  async handleCreate(req: HttpRequest): Promise<HttpResponse> {
    try {
      // Validação do contrato de entrada usando safeParseWithLogging
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
          type: 'https://api.empresa.com/errors/invalid-payload',
          title: 'Payload inválido',
          status: 400,
          detail: err instanceof Error ? err.message : 'Erro na requisição',
        },
      };
    }
  }
}

