import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { PaydetailProvider } from './PayPageContext';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <PaydetailProvider>{children}</PaydetailProvider>
      </CartProvider>
    </AuthProvider>
  );
}