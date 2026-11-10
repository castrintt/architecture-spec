/**
 * Unit Test Example for Controller:
 * Proves the core architectural promise: test 100% of screen logic
 * in pure Node by supplying mock dependencies without requiring DOM rendering.
 */
import { useCheckoutController, CheckoutServiceDependency } from './checkout.controller.js';

export async function runControllerScenarioTest() {
  console.log('🧪 Starting CheckoutController unit test...');

  // 1. Mock the application service dependency
  const mockServiceSuccess: CheckoutServiceDependency = {
    confirmPayment: async () => ({ success: true, transactionId: 'trx_test_123' }),
  };

  let capturedTransactionId = '';

  // 2. Execute controller passing the injected mock
  const controller = useCheckoutController({
    orderId: 'ord_123',
    totalCents: 5000,
    service: mockServiceSuccess,
    onPaymentSuccess: (trxId) => {
      capturedTransactionId = trxId;
    },
  });

  // 3. Assert initial state
  if (!controller.states.formattedTotal.includes('50.00')) {
    throw new Error(`Incorrect formatted total: ${controller.states.formattedTotal}`);
  }

  // 4. Trigger action
  await controller.actions.handleConfirmPayment();

  // 5. Assert side effects
  if (capturedTransactionId !== 'trx_test_123') {
    throw new Error('Failure: Success callback was not invoked with correct ID');
  }

  console.log('✅ CheckoutController unit test passed successfully!');
}
