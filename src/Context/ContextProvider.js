import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
