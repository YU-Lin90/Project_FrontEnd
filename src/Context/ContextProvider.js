import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { PaydetailProvider } from './PayPageContext';
import { FunctionProvider } from './FunctionProvider';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <FunctionProvider>
          <PaydetailProvider>{children}</PaydetailProvider>
        </FunctionProvider>
      </CartProvider>
    </AuthProvider>
  );
}
