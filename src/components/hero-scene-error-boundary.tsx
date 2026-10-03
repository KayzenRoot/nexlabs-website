"use client";

import { Component, type ReactNode } from "react";

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onFailure: (reason: unknown) => void;
}

interface SceneErrorBoundaryState {
  hasFailed: boolean;
}

/** Converts render/runtime scene errors into the caller-controlled poster fallback. */
export class HeroSceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasFailed: false };

  /** Marks the scene subtree as failed so React stops rendering the WebGL branch. */
  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasFailed: true };
  }

  /** Reports the captured scene error to the hero controller. */
  componentDidCatch(error: Error) {
    this.props.onFailure(error);
  }

  /** Renders children until a scene failure occurs, then yields to the poster. */
  render() {
    return this.state.hasFailed ? null : this.props.children;
  }
}
