import { useState } from 'react';
import { CheckoutViewProps } from './checkout.view.js';

export interface CheckoutServiceDependency {
  confirmPayment(orderId: string): Promise<{ success: boolean; transactionId?: string }>;
}

export interface CheckoutControllerParams {
  orderId: string;
  totalCents: number;
  service: CheckoutServiceDependency;
  onPaymentSuccess?: (transactionId: string) => void;
}

/**
 * Camada Controller (Lógica de Tela / ViewModel):
 * - Recebe serviços e dependências externas via parâmetros de injeção.
 * - Gerencia estados locais da tela.
 * - Retorna rigorosamente dois objetos: 'states' e 'actions'.
 * - Pode ser testado de forma unitária isolando completamente a View.
 */
export function useCheckoutController({
  orderId,
  totalCents,
  service,
  onPaymentSuccess,
}: CheckoutControllerParams): CheckoutViewProps {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formattedTotal = (totalCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const result = await service.confirmPayment(orderId);
      if (result.success) {
        setIsSuccess(true);
        if (result.transactionId && onPaymentSuccess) {
          onPaymentSuccess(result.transactionId);
        }
      } else {
        setErrorMessage('Não foi possível processar a cobrança.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setErrorMessage(null);
  };

  return {
    states: {
      orderId,
      formattedTotal,
      isProcessing,
      errorMessage,
      isSuccess,
    },
    actions: {
      handleConfirmPayment,
      handleRetry,
    },
  };
}

