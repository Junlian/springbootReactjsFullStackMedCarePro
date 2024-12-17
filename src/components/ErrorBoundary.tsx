import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  isRecovering: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    isRecovering: false
  };

  private handleRecovery = async () => {
    this.setState({ isRecovering: true });
    try {
      this.setState({ hasError: false });
    } finally {
      this.setState({ isRecovering: false });
    }
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, isRecovering: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={this.handleRecovery}
            disabled={this.state.isRecovering}
          >
            {this.state.isRecovering ? 'Recovering...' : 'Try again'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 