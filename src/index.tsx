import React, { CSSProperties } from "react";

interface Props {
  next: () => any;
  hasMore: boolean;
  dataLength: number;
  loader?: JSX.Element;
  scrollThreshold?: string | number;
  endMessage?: JSX.Element | string;
  height?: number;
  scrollableTarget?: JSX.Element;
  style?: CSSProperties;
  className?: string;
}

const InfiniteScroll: React.SFC<Props> = props => {
  const style: CSSProperties = {
    height: props.height || "auto",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    ...props.style
  };
  const className = `infinite-scroll-component ${props.className || ""}`;
  return (
    <div>
      <div style={style} className={className}>
        {props.children}
      </div>
    </div>
  );
};

export default InfiniteScroll;
