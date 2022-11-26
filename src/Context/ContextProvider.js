import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { PaydetailProvider } from './PayPageContext';
import { FunctionProvider } from './FunctionProvider';
import { SVGProvider } from './SVGProvider';
import { GeoLocationProvider } from './GeoLocationProvider';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <GeoLocationProvider>
        <FunctionProvider>
          <PaydetailProvider>
            <SVGProvider>
              <CartProvider>{children} </CartProvider>
            </SVGProvider>
          </PaydetailProvider>
        </FunctionProvider>
      </GeoLocationProvider>
    </AuthProvider>
  );
}
