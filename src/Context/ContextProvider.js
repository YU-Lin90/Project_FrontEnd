import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { PaydetailProvider } from './PayPageContext';
import { FunctionProvider } from './FunctionProvider';
import { SVGProvider } from './SVGProvider';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <FunctionProvider>
        <PaydetailProvider>
          <SVGProvider>
            <CartProvider>{children} </CartProvider>
          </SVGProvider>
        </PaydetailProvider>
      </FunctionProvider>
    </AuthProvider>
  );
}
