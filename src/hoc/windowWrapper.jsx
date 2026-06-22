import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

import useWindowStore from "#store/window";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const contentRef = useRef(null);
    const resizeHandleRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const startSizeRef = useRef({ width: 0, height: 0 });

    const getSizeLimits = useCallback(() => {
      const maxWidth = Math.floor(window.innerWidth * 0.9);
      const maxHeight = Math.floor(window.innerHeight * 0.8);
      const minWidth = 1000;
      const minHeight = 800;

      const finalMinWidth = Math.min(minWidth, maxWidth);
      const finalMinHeight = Math.min(minHeight, maxHeight);

      return {
        minWidth: finalMinWidth,
        minHeight: finalMinHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
      };
    }, []);

    const limits = getSizeLimits();

    const defaultHeight = Math.floor(window.innerHeight * 0.6);
    
    const initialWidth = Math.min(
      Math.max(1000, limits.minWidth),
      limits.maxWidth,
    );
    const initialHeight = Math.min(
      Math.max(defaultHeight, limits.minHeight),
      limits.maxHeight,
    );

    const [size, setSize] = useState({
      width: initialWidth,
      height: initialHeight,
    });

    const generateRandomPosition = useCallback(() => {
      const padding = 20;
      const maxX = window.innerWidth - size.width - padding;
      const maxY = window.innerHeight - size.height - padding;

      const x =
        maxX > 0
          ? Math.max(padding, Math.floor(Math.random() * maxX))
          : padding;
      const y =
        maxY > 0
          ? Math.max(padding, Math.floor(Math.random() * maxY))
          : padding;

      return { x, y };
    }, [size.width, size.height]);

    const [position, setPosition] = useState(() => generateRandomPosition());

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";

      if (!isInitialized) {
        const newPos = generateRandomPosition();
        setPosition(newPos);
        setIsInitialized(true);
      }

      gsap.set(el, {
        x: position.x,
        y: position.y,
      });

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        },
      );
    }, [isOpen, isInitialized]);

    useEffect(() => {
      if (!isOpen) {
        setIsInitialized(false);
      }
    }, [isOpen]);

    // Draggable برای حرکت پنجره
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        type: "x,y",
        onPress: () => focusWindow(windowKey),
        onDrag: function () {
          setPosition({
            x: this.x,
            y: this.y,
          });

          this.applyBounds({
            minX: 0,
            minY: 0,
            maxX: window.innerWidth - this.target.offsetWidth,
            maxY: window.innerHeight - this.target.offsetHeight,
          });
        },
      });

      return () => instance.kill();
    }, []);

    // ایجاد resize handle فیکس در گوشه پایین راست
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (resizeHandleRef.current) {
        if (resizeHandleRef.current.parentNode) {
          resizeHandleRef.current.parentNode.removeChild(
            resizeHandleRef.current,
          );
        }
        resizeHandleRef.current = null;
      }

      const resizeContainer = document.createElement("div");
      resizeContainer.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        z-index: 20;
        pointer-events: none;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        background: transparent;
      `;

      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      resizeHandle.style.cssText = `
        width: 0;
        height: 0;
        border-bottom: 20px solid #000000;
        border-left: 20px solid transparent;
        pointer-events: none;
        user-select: none;
        flex-shrink: 0;
        margin-bottom: 3px;
        margin-right: 3px;
        opacity: 0.9;
      `;

      const dragArea = document.createElement("div");
      dragArea.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        width: 35px;
        height: 35px;
        cursor: nwse-resize;
        z-index: 21;
        background: transparent;
        pointer-events: auto;
      `;

      resizeContainer.appendChild(resizeHandle);
      resizeContainer.appendChild(dragArea);
      el.appendChild(resizeContainer);
      resizeHandleRef.current = dragArea;

      const [resizeInstance] = Draggable.create(dragArea, {
        type: "x,y",
        trigger: dragArea,
        onPress: (e) => {
          e.stopPropagation();
          e.preventDefault();
          focusWindow(windowKey);
          setIsResizing(true);

          const parent = ref.current;
          const rect = parent.getBoundingClientRect();
          startPosRef.current = { x: e.clientX, y: e.clientY };
          startSizeRef.current = {
            width: rect.width,
            height: rect.height,
          };
        },
        onDrag: function (e) {
          const deltaX = e.clientX - startPosRef.current.x;
          const deltaY = e.clientY - startPosRef.current.y;

          let newWidth = startSizeRef.current.width + deltaX;
          let newHeight = startSizeRef.current.height + deltaY;

          const limits = getSizeLimits();
          newWidth = Math.min(
            Math.max(newWidth, limits.minWidth),
            limits.maxWidth,
          );
          newHeight = Math.min(
            Math.max(newHeight, limits.minHeight),
            limits.maxHeight,
          );

          setSize({ width: newWidth, height: newHeight });

          this.target.style.transform = "translate(0px, 0px)";
          this.x = 0;
          this.y = 0;
        },
        onRelease: () => {
          setIsResizing(false);
          if (dragArea) {
            dragArea.style.transform = "translate(0px, 0px)";
          }
        },
      });

      return () => {
        resizeInstance.kill();
        if (resizeContainer.parentNode) {
          resizeContainer.parentNode.removeChild(resizeContainer);
        }
        resizeHandleRef.current = null;
      };
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      const contentEl = contentRef.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";

      if (isOpen) {
        const limits = getSizeLimits();
        el.style.width = `${size.width}px`;
        el.style.height = `${size.height}px`;
        el.style.minWidth = `${limits.minWidth}px`;
        el.style.minHeight = `${limits.minHeight}px`;
        el.style.maxWidth = `${limits.maxWidth}px`;
        el.style.maxHeight = `${limits.maxHeight}px`;
        el.style.overflow = "hidden";
        el.style.position = "absolute";
        el.style.top = "0";
        el.style.left = "0";
        el.style.transform = `translate(${position.x}px, ${position.y}px)`;

        if (contentEl) {
          contentEl.style.height = `${size.height - 32}px`;
          contentEl.style.overflowY = "auto";
          contentEl.style.overflowX = "hidden";
          contentEl.style.padding = "16px";
          contentEl.style.width = "100%";
          contentEl.style.boxSizing = "border-box";
        }
      }
    }, [isOpen, size, position, getSizeLimits]); // اضافه کردن getSizeLimits به وابستگی‌ها

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          position: "absolute",
          top: 0,
          left: 0,
          minWidth: `${limits.minWidth}px`,
          minHeight: `${limits.minHeight}px`,
          maxWidth: `${limits.maxWidth}px`,
          maxHeight: `${limits.maxHeight}px`,
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isResizing ? "none" : "width 0.1s ease, height 0.1s ease",
        }}
        className="absolute"
      >
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Component {...props} />
        </div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default windowWrapper;