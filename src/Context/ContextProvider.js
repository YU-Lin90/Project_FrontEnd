import { AuthProvider } from './AuthProvider';
// import { CartProvider } from './CartProvider';
import { PaydetailProvider } from './PayPageContext';
import { FunctionProvider } from './FunctionProvider';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <FunctionProvider>
        <PaydetailProvider>{children}</PaydetailProvider>
      </FunctionProvider>
    </AuthProvider>
  );
}
