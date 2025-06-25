import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error boundary capturou:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ops, algo deu errado.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;