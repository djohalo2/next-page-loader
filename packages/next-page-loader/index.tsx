import React, { useEffect, useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';

export type PageLoaderProps = {
  /** Custom class name for the progress bar element */
  className?: string;
  /** Custom class name for the progress container element */
  containerClassName?: string;
  /** Custom style (override) properties for the progress bar element */
  style?: React.CSSProperties;
  /** Custom style (override) properties for the container element */
  containerStyle?: React.CSSProperties;
  /** Page loader CSS transition duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;
  /** Time between each progress step in milliseconds
   * @default 500
   */
  intervalDuration?: number;
  /** Debounce time before showing the page loader in milliseconds
   * @default 200
   */
  debounceDuration?: number;
  /** Minimum progress percentage on page load start
   * @default 5
   */
  initialStepMin?: number;
  /** Maximum progress percentage on page load start
   * @default 10
   */
  initialStepMax?: number;
  /** Minimum progress percentage step for loading interval
   * @default 1
   */
  stepMin?: number;
  /** Maximum progress percentage step for loading interval
   * @default 2
   */
  stepMax?: number;
};

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Constants
const MIN_PROGRESS = 0;
const MAX_PROGRESS = 100;

// Default overridable styles
const DEFAULT_STYLE: React.CSSProperties = {
  width: '100%',
  height: '3px',
  backgroundColor: 'dodgerblue',
};
const DEFAULT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
};

export default function PageLoader({
  className,
  containerClassName,
  style = DEFAULT_STYLE,
  containerStyle = DEFAULT_CONTAINER_STYLE,
  transitionDuration = 300,
  intervalDuration = 500,
  debounceDuration = 50,
  initialStepMin = 5,
  initialStepMax = 10,
  stepMin = 1,
  stepMax = 2,
}: PageLoaderProps) {
  const router = useRouter();

  const [progress, setProgress] = useState(MIN_PROGRESS);
  const [loading, setLoading] = useState(false);
  const [animateLoader, setAnimateLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const debouncedLoadTimeout = useRef(0);
  const loadTimeout = useRef(0);
  const resetTimeout = useRef(0);
  const loadInterval = useRef(0);

  function clearTimers() {
    clearTimeout(debouncedLoadTimeout.current);
    clearTimeout(loadTimeout.current);
    clearTimeout(resetTimeout.current);
    clearInterval(loadInterval.current);
  }

  useEffect(() => {
    function startDebouncedLoading(path: string) {
      if (path === router.asPath.split('#')[0]) {
        return;
      }

      clearTimeout(debouncedLoadTimeout.current);
      debouncedLoadTimeout.current = window.setTimeout(() => setLoading(true), debounceDuration);
    }

    function stopDebouncedLoading() {
      clearTimeout(debouncedLoadTimeout.current);
      setLoading(false);
    }

    function cancelLoading() {
      setAnimateLoader(false);
      setLoading(false);
      setShowLoader(false);
      setProgress(MIN_PROGRESS);

      clearTimers();
    }

    Router.events.on('routeChangeStart', startDebouncedLoading);
    Router.events.on('routeChangeComplete', stopDebouncedLoading);
    Router.events.on('routeChangeError', cancelLoading);

    return () => {
      Router.events.off('routeChangeStart', startDebouncedLoading);
      Router.events.off('routeChangeComplete', stopDebouncedLoading);
      Router.events.off('routeChangeError', cancelLoading);

      // Clear any remaining timeouts or intervals on unmount
      clearTimers();
    };
  }, [router.asPath]);

  useEffect(() => {
    if (showLoader) {
      setProgress(random(initialStepMin, initialStepMax));
    }
  }, [showLoader]);

  useEffect(() => {
    function startLoading() {
      if (showLoader) {
        return;
      }

      clearTimeout(loadTimeout.current);
      clearTimeout(resetTimeout.current);

      setProgress(MIN_PROGRESS);
      setShowLoader(true);
      setAnimateLoader(true);

      loadInterval.current = window.setInterval(updateProgressRandomly, intervalDuration);
    }

    function stopLoading() {
      if (!showLoader) {
        return;
      }

      setProgress(MAX_PROGRESS);
      clearInterval(loadInterval.current);

      // Wait for transition scale 100% to finish
      loadTimeout.current = window.setTimeout(() => {
        setShowLoader(false);

        // Wait for transition opacity 0 to finish
        resetTimeout.current = window.setTimeout(() => {
          setAnimateLoader(false);
          setProgress(MIN_PROGRESS);
        }, transitionDuration);
      }, transitionDuration);
    }

    function updateProgressRandomly() {
      setProgress(prevProgress => Math.min(MAX_PROGRESS, prevProgress + random(stepMin, stepMax)));
    }

    loading ? startLoading() : stopLoading();
  }, [loading, showLoader]);

  const transitionStyle = animateLoader ? {} : { transition: 'none' };

  return (
    <div
      className={containerClassName}
      style={{
        ...(containerClassName ? {} : { ...DEFAULT_CONTAINER_STYLE, ...containerStyle }),
        transition: `opacity ${transitionDuration}ms ease-out`,
        opacity: showLoader ? 1 : 0,
        ...transitionStyle,
      }}>
      <div
        className={className}
        style={{
          ...(className ? {} : { ...DEFAULT_STYLE, ...style }),
          transition: `transform ${transitionDuration}ms ease-out`,
          transform: `scaleX(${progress}%)`,
          transformOrigin: 'left',
          ...transitionStyle,
        }}
      />
    </div>
  );
}
