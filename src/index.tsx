import React, { CSSProperties, createRef, useEffect, useState } from "react";

interface Props {
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

const InfiniteScroll: React.SFC<Props> = props => {
  const sentinel = createRef<HTMLDivElement>();
  const infiniteScrollElement = createRef<HTMLDivElement>();
  const [showLoader, setShowLoader] = useState(false);
  // const [showSentinel, setShowSentinel] = useState(false);
  // const observer = createRef<IntersectionObserver>();

  const style: CSSProperties = {
    height: props.height || "auto",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    ...props.style
  };

  const getScrolltarget = () => {
    if (props.height) return infiniteScrollElement.current;
    if (props.scrollableTarget) return props.scrollableTarget;
    return;
  };

  // on mount
  useEffect(() => {
    const options = {
      root: getScrolltarget(),
      threshold: 1,
      rootMargin: `${props.scrollThreshold || 50}px`
    };
    let observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // show loader
          setShowLoader(true);
          props.next();
        }
      });
    }, options);
    if (sentinel.current) observer.observe(sentinel.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setShowLoader(false);
  }, [props.dataLength]);

  const className = `infinite-scroll-component ${props.className || ""}`;
  return (
    <div>
      <div style={style} className={className} ref={infiniteScrollElement}>
        {props.children}
      </div>
      {showLoader && props.loader}
      <div ref={sentinel} id="infinite-scroll-sentinel" />
    </div>
  );
};

export default InfiniteScroll;
