import React, {
  CSSProperties,
  createRef,
  useEffect,
  useState,
  useRef
} from "react";
import { InfiniteScrollProps } from "./types";

const InfiniteScroll: React.SFC<InfiniteScrollProps> = props => {
  // refs
  const sentinel = createRef<HTMLDivElement>();
  const infiniteScrollElement = createRef<HTMLDivElement>();
  const apiFired = useRef(false);

  // state
  const [showLoader, setShowLoader] = useState(false);

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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.intersectionRatio === 0) {
          // means user going back up? remove lock?
          apiFired.current = false;
        }
        if (e.isIntersecting && !apiFired.current) {
          // show loader
          setShowLoader(true);
          apiFired.current = true;
          props.next();
        }
      });
    }, options);
    if (sentinel.current) observer.observe(sentinel.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // will receive props
  useEffect(() => {
    setShowLoader(false);
    apiFired.current = false;
  }, [props.dataLength]);

  const className = `infinite-scroll-component ${props.className || ""}`;
  return (
    <div>
      <div style={style} className={className} ref={infiniteScrollElement}>
        {props.children}
      </div>
      <div ref={sentinel} id="infinite-scroll-sentinel" />
      {showLoader && props.loader}
    </div>
  );
};

export default InfiniteScroll;
