import { Button, Card } from "@heroui/react";
import { Component, ErrorInfo, ReactNode } from "react";

/* eslint-disable no-console */
type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Always log the error, regardless of environment
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // You could also send this to an error tracking service like Sentry
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="error-container container shadow-none mx-auto px-2 text-center font-poppins flex gap-4 flex-col items-center justify-center h-screen">
          <h2 className="font-semibold capitalize">Oops! Something went wrong.</h2>
          
          {/* Show error message only in development */}
          {process.env.NODE_ENV === 'development' && this.state.error?.message && (
            <p className="font-medium">{this.state.error.message}</p>
          )}
          
          {/* Optional: Show a generic message in production */}
          {process.env.NODE_ENV === 'production' && (
            <p className="font-medium">We're sorry for the inconvenience. Our team has been notified.</p>
          )}
          
          <Button 
            className="text-white bg-default-900" 
            onPress={() => this.setState({ hasError: false })}
          >
            Try Again
          </Button>
        </Card>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
