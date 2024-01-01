// MyErrorBoundary.js
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const MyErrorBoundary = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
    {children}
  </ErrorBoundary>
);

export default MyErrorBoundary;
