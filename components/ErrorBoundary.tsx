import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-light p-8 text-center">
          <div className="glass-card p-8 md:p-12 rounded-xl shadow-xl">
            <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-6"></i>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-text-muted mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="gradient-bg text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition focus-visible-outline"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-dark-secondary p-4 rounded-lg text-sm text-text-muted overflow-auto max-h-60">
                <summary className="font-semibold cursor-pointer hover:text-light">Error Details (Development)</summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
