"use client";

import { Component, type ReactNode } from "react";

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onFailure: (reason: unknown) => void;
}

interface SceneErrorBoundaryState {
  hasFailed: boolean;
}

export class HeroSceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasFailed: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasFailed: true };
  }

  componentDidCatch(error: Error) {
    this.props.onFailure(error);
  }

  render() {
    return this.state.hasFailed ? null : this.props.children;
  }
}
