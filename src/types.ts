import { CSSProperties } from "react";

export interface InfiniteScrollProps {
  next: () => any;
  hasMore: boolean;
  dataLength: number;
  loader?: JSX.Element;
  scrollThreshold?: number;
  endMessage?: JSX.Element | string;
  height?: number;
  scrollableTarget?: Element;
  style?: CSSProperties;
  className?: string;
}
