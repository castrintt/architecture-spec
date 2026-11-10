import { useState } from 'react';
import { CheckoutViewProps } from './checkout.view.js';
import { formatCurrency } from '../../../utils/calculations.js';

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
 * Controller Layer (ViewModel / Screen Logic):
 * - Receives services and external dependencies via injection parameters.
 * - Owns local screen state hooks.
 * - Returns strictly two objects: 'states' and 'actions'.
 * - Unit testable in pure Node without DOM rendering tools.
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

  const formattedTotal = formatCurrency(totalCents);

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
        setErrorMessage('Unable to process the charge.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unexpected error.');
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
