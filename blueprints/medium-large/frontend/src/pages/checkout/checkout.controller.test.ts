/**
 * Exemplo de Teste Unitário do Controller:
 * Prova a principal promessa da arquitetura: testar 100% da lógica da tela
 * de forma pura, injetando mocks nas dependências sem precisar de renderização DOM.
 */
import { useCheckoutController, CheckoutServiceDependency } from './checkout.controller.js';

// Mock simplificado do react hooks para execução pura de exemplo
export async function runControllerScenarioTest() {
  console.log('🧪 Iniciando teste unitário do CheckoutController...');

  // 1. Mock do serviço de aplicação
  const mockServiceSuccess: CheckoutServiceDependency = {
    confirmPayment: async () => ({ success: true, transactionId: 'trx_test_123' }),
  };

  let capturedTransactionId = '';

  // 2. Executa a controller passando o mock injetado
  const controller = useCheckoutController({
    orderId: 'ord_123',
    totalCents: 5000,
    service: mockServiceSuccess,
    onPaymentSuccess: (trxId) => {
      capturedTransactionId = trxId;
    },
  });

  // 3. Asserção do estado inicial
  if (controller.states.formattedTotal !== 'R$ 50,00' && controller.states.formattedTotal !== 'R$ 50,00') {
    throw new Error(`Total formatado incorreto: ${controller.states.formattedTotal}`);
  }

  // 4. Disparo da action
  await controller.actions.handleConfirmPayment();

  // 5. Asserção de efeitos
  if (capturedTransactionId !== 'trx_test_123') {
    throw new Error('Falha: Callback de sucesso não foi chamado com o ID correto');
  }

  console.log('✅ Teste unitário do CheckoutController passou com sucesso!');
}

