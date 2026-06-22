import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

const CHARSETS = {
  glitch: "▓▒░█▄▀■□▪▫●○◘◙♦♣♠♥☺☻☼▬↨‼¶§▐↕↑↓→←∟↔▲▼!@#$%^&*()_+-=[]{}|;:,./<>?",
};

const Welcome = () => {
  const containerRef = useRef(null);
  const subtitleContainerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const scanlineRef = useRef(null);
  const cursorRef = useRef(null);
  const crtOverlayRef = useRef(null);
  const terminalRef = useRef(null);
  const hexGhostRef = useRef(null);

  const [subtitleDone, setSubtitleDone] = useState(false);
  const [titleDone, setTitleDone] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const subtitleText = "Hey, I'm Ali! Welcome to my";
  const titleText = "Portfolio";

  const randomGlitchChar = () => {
    const chars = CHARSETS.glitch;
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // CRT Overlay
  useEffect(() => {
    if (!crtOverlayRef.current) return;

    const flicker = () => {
      const randomOpacity = 0.02 + Math.random() * 0.03;
      crtOverlayRef.current.style.opacity = randomOpacity;
    };

    const flickerInterval = setInterval(flicker, 50);

    const bigFlicker = () => {
      crtOverlayRef.current.style.opacity = "0.1";
      setTimeout(
        () => {
          crtOverlayRef.current.style.opacity = "0.03";
        },
        100 + Math.random() * 200,
      );
    };

    const bigFlickerInterval = setInterval(
      bigFlicker,
      3000 + Math.random() * 4000,
    );

    return () => {
      clearInterval(flickerInterval);
      clearInterval(bigFlickerInterval);
    };
  }, []);

  // Hex ghost text
  useEffect(() => {
    if (!titleDone || !titleContainerRef.current) return;

    const titleEl = titleContainerRef.current;
    const hexText = [...titleText]
      .map((char) => {
        const hex = char.charCodeAt(0).toString(16).toUpperCase();
        return `0x${hex}`;
      })
      .join(" ");

    const ghostEl = document.createElement("div");
    ghostEl.className =
      "absolute inset-0 flex items-center justify-center pointer-events-none";
    ghostEl.style.zIndex = "-1";
    ghostEl.style.opacity = "0.06";
    ghostEl.style.color = "#ef4444";
    ghostEl.style.fontFamily = "monospace";
    ghostEl.style.fontSize = "12px";
    ghostEl.style.letterSpacing = "2px";
    ghostEl.textContent = hexText;
    ghostEl.style.filter = "blur(1px)";

    titleEl.parentElement.appendChild(ghostEl);
    hexGhostRef.current = ghostEl;

    return () => {
      if (ghostEl.parentNode) {
        ghostEl.parentNode.removeChild(ghostEl);
      }
    };
  }, [titleDone]);

  useEffect(() => {
    if (subtitleDone && titleDone) {
      const delay = setTimeout(() => {
        setTimeout(() => setShowTerminal(true), 800);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [subtitleDone, titleDone]);

  // Scramble effect
  useGSAP(() => {
    if (!subtitleContainerRef.current) return;

    const container = subtitleContainerRef.current;
    const finalChars = [...subtitleText];
    const spans = [];

    container.innerHTML = "";

    finalChars.forEach((char) => {
      const span = document.createElement("span");
      span.className = "inline-block";
      span.textContent = char === " " ? "\u00A0" : randomGlitchChar();
      span.style.color = "#4b5563";
      span.dataset.final = char === " " ? "\u00A0" : char;
      container.appendChild(span);
      spans.push(span);
    });

    let frame;
    const startTime = Date.now();
    const duration = 1500;

    const scramble = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      spans.forEach((span, i) => {
        const letterStart = (i / spans.length) * 0.5;
        const letterProgress = Math.max(
          0,
          Math.min(1, (progress - letterStart) / 0.5),
        );

        if (letterProgress >= 1) {
          span.textContent = span.dataset.final;
          span.style.color = "#e5e7eb";
          span.style.textShadow = "none";
        } else {
          if (Math.random() < 0.8) {
            span.textContent = randomGlitchChar();
          }
          span.style.color = "#ef4444";
          span.style.textShadow = "0 0 8px rgba(239, 68, 68, 0.5)";
        }
      });

      if (progress < 1) {
        frame = requestAnimationFrame(scramble);
      } else {
        spans.forEach((span) => {
          span.textContent = span.dataset.final;
          span.style.color = "#e5e7eb";
          span.style.textShadow = "none";
        });
        setSubtitleDone(true);
      }
    };

    frame = requestAnimationFrame(scramble);

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Scanline reveal
  useGSAP(() => {
    if (!titleContainerRef.current) return;

    const title = titleContainerRef.current;
    const finalChars = [...titleText];

    title.innerHTML = "";

    finalChars.forEach((char) => {
      const span = document.createElement("span");
      span.className = "inline-block";
      span.textContent = char;
      span.dataset.final = char;
      title.appendChild(span);
    });

    gsap.set(title, {
      clipPath: "inset(0 0 100% 0)",
      opacity: 0,
    });

    if (scanlineRef.current) {
      gsap.set(scanlineRef.current, {
        top: "0%",
        opacity: 1,
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (scanlineRef.current) {
          gsap.to(scanlineRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              if (scanlineRef.current) {
                scanlineRef.current.style.display = "none";
              }
            },
          });
        }

        gsap.to(title, {
          textShadow: "none",
          duration: 0.8,
          ease: "power2.out",
        });

        setTitleDone(true);
      },
    });

    tl.to(title, {
      opacity: 1,
      duration: 0.1,
    })
      .to(title, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(title, {
        opacity: 0.2,
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        ease: "none",
      })
      .to(title, {
        opacity: 1,
        duration: 0.1,
      });

    if (scanlineRef.current) {
      gsap.to(scanlineRef.current, {
        top: "100%",
        duration: 1.2,
        ease: "power2.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Terminal
  useEffect(() => {
    if (!showTerminal || !terminalRef.current) return;

    const terminal = terminalRef.current;
    const container = terminal.querySelector(".terminal-content");
    if (!container) return;

    let timeout;
    let progressInterval;

    const addLine = (html, className = "") => {
      const div = document.createElement("div");
      div.className = `text-xs font-mono leading-relaxed ${className}`;
      div.innerHTML = html;
      container.appendChild(div);
      return div;
    };

    // کل مکعب - فقط Ali Shahbaz
    const cubeArt = [
      "╔═══════════════════════════════════════════════════════════════════════════════════════════════╗",
      "║                                                                                               ║",
      "║                                                                                               ║",
      "║         █████╗ ██╗     ██╗    ███████╗██╗  ██╗ █████╗ ██╗  ██╗██████╗  █████╗ ███████╗     ║",
      "║        ██╔══██╗██║     ██║    ██╔════╝██║  ██║██╔══██╗██║  ██║██╔══██╗██╔══██╗╚══███╔╝     ║",
      "║        ███████║██║     ██║    ███████╗███████║███████║███████║██████╔╝███████║  ███╔╝       ║",
      "║        ██╔══██║██║     ██║    ╚════██║██╔══██║██╔══██║██╔══██║██╔══██╗██╔══██║ ███╔╝        ║",
      "║        ██║  ██║███████╗██║    ███████║██║  ██║██║  ██║██║  ██║██████╔╝██║  ██║███████╗     ║",
      "║        ╚═╝  ╚═╝╚══════╝╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝     ║",
      "║                                                                                               ║",
      "║                                                                                               ║",
      "╚═══════════════════════════════════════════════════════════════════════════════════════════════╝",
    ];

    // Step 1: npm install
    const step1 = () => {
      const installLines = [
        {
          text: '<span style="color:#6b7280">$</span> <span style="color:#fbbf24">npm</span> <span style="color:#f87171">install</span> ali-shahbaz',
          delay: 400,
        },
        {
          text: '<span style="color:#6b7280">Collecting</span> <span style="color:#f87171">ali-shahbaz</span>...',
          delay: 300,
        },
      ];

      let lineIdx = 0;
      let charIdx = 0;

      const typeInstall = () => {
        if (lineIdx < installLines.length) {
          const line = installLines[lineIdx];
          let div = container.querySelectorAll(".install-line")[lineIdx];
          if (!div) {
            div = document.createElement("div");
            div.className =
              "install-line text-xs font-mono leading-relaxed mb-0.5";
            container.appendChild(div);
          }

          const plainText = line.text.replace(/<[^>]*>/g, "");
          if (charIdx < plainText.length) {
            div.innerHTML = line.text.substring(
              0,
              line.text.indexOf(plainText[charIdx]) + 1,
            );
            charIdx++;
            timeout = setTimeout(typeInstall, 20);
          } else {
            div.innerHTML = line.text;
            lineIdx++;
            charIdx = 0;
            timeout = setTimeout(typeInstall, line.delay);
          }
        } else {
          timeout = setTimeout(step2, 300);
        }
      };

      typeInstall();
    };

    // Step 2: Download
    const step2 = () => {
      const downloadDiv = document.createElement("div");
      downloadDiv.className = "mb-2";
      downloadDiv.id = "download-section";
      container.appendChild(downloadDiv);

      const dlText = document.createElement("div");
      dlText.className = "text-xs font-mono text-gray-400 mb-1";
      dlText.textContent = "  Downloading ali-shahbaz-2.5.0.tgz";
      downloadDiv.appendChild(dlText);

      const barDiv = document.createElement("div");
      barDiv.className = "flex items-center gap-2 ml-2";
      downloadDiv.appendChild(barDiv);

      const barTrack = document.createElement("div");
      barTrack.className =
        "flex-1 h-2 bg-gray-800 rounded-full overflow-hidden";
      barDiv.appendChild(barTrack);

      const barFill = document.createElement("div");
      barFill.className = "h-full rounded-full";
      barFill.style.width = "0%";
      barFill.style.background =
        "linear-gradient(90deg, #dc2626, #ef4444, #f87171)";
      barFill.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.6)";
      barFill.style.transition = "width 0.15s ease";
      barTrack.appendChild(barFill);

      const percentText = document.createElement("span");
      percentText.className = "text-xs font-mono text-red-400 w-10";
      percentText.textContent = "0%";
      barDiv.appendChild(percentText);

      let progress = 0;
      progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          barFill.style.width = "100%";
          percentText.textContent = "100%";

          timeout = setTimeout(() => {
            gsap.to(downloadDiv, {
              opacity: 0,
              height: 0,
              marginBottom: 0,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                downloadDiv.remove();
                timeout = setTimeout(step3, 200);
              },
            });
          }, 400);
        } else {
          barFill.style.width = progress + "%";
          percentText.textContent = Math.floor(progress) + "%";
        }
      }, 80);
    };

    // Step 3: Installing
    const step3 = () => {
      const installLine = addLine(
        '<span style="color:#6b7280">Installing</span> <span style="color:#f87171">collected packages</span>...',
        "mb-2",
      );
      installLine.style.opacity = "0";
      gsap.to(installLine, { opacity: 1, duration: 0.3 });

      timeout = setTimeout(() => {
        addLine("", "mb-1");

        const successLine = addLine(
          '<span style="color:#4ade80">✔ Successfully installed</span> <span style="color:#f87171;font-weight:bold">ali-shahbaz-2.5.0</span>',
          "mb-3",
        );
        successLine.style.opacity = "0";
        gsap.to(successLine, { opacity: 1, duration: 0.3 });

        timeout = setTimeout(step4, 800);
      }, 400);
    };

    // Step 4: Cube ASCII Art
    const step4 = () => {
      const cubeContainer = document.createElement("div");
      cubeContainer.className = "mb-2";
      cubeContainer.style.opacity = "0";
      cubeContainer.style.transform = "scale(0.8)";
      container.appendChild(cubeContainer);

      cubeArt.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "cube-line rainbow-cube";
        lineDiv.style.cssText = `
          font-family: 'Courier New', monospace;
          font-size: 6px;
          line-height: 1.2;
          white-space: pre;
          letter-spacing: 0;
          background: linear-gradient(90deg, 
            #ff0000, #ff7700, #ffff00, #77ff00, #00ff00, #00ff77,
            #00ffff, #0077ff, #0000ff, #7700ff, #ff00ff, #ff0077,
            #ff0000
          );
          background-size: 400% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rainbowFlow 6s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
        `;
        lineDiv.textContent = line;
        cubeContainer.appendChild(lineDiv);
      });

      const styleEl = document.createElement("style");
      styleEl.textContent = `
        @keyframes rainbowFlow {
          0% { background-position: 0% center; }
          50% { background-position: 200% center; }
          100% { background-position: 400% center; }
        }
      `;
      cubeContainer.appendChild(styleEl);

      gsap.to(cubeContainer, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          timeout = setTimeout(step5, 1500);
        },
      });
    };

    // Step 5: npm list tree style
    const step5 = () => {
      timeout = setTimeout(() => {
        const packages = [
          { name: "typescript", ver: "5.0.0" },
          { name: "react", ver: "19.0.0" },
          { name: "next", ver: "16.0.0" },
        ];

        // Header
        const headerDiv = document.createElement("div");
        headerDiv.className = "text-xs font-mono mb-1";
        headerDiv.style.opacity = "0";
        headerDiv.innerHTML =
          '<span style="color:#6b7280">ali-shahbaz@2.5.0</span>';
        container.appendChild(headerDiv);

        // Tree
        const treeDiv = document.createElement("div");
        treeDiv.className = "mb-2";
        treeDiv.style.opacity = "0";

        packages.forEach((pkg, i) => {
          const isLast = i === packages.length - 1;
          const prefix = isLast ? "└── " : "├── ";

          const pkgDiv = document.createElement("div");
          pkgDiv.className = "text-xs font-mono leading-relaxed";
          pkgDiv.innerHTML = `
            <span style="color:#6b7280">${prefix}</span>
            <span style="color:#e5e7eb">${pkg.name}</span>
            <span style="color:#6b7280">@</span>
            <span style="color:#9ca3af">${pkg.ver}</span>
          `;
          treeDiv.appendChild(pkgDiv);

          gsap.to(pkgDiv, {
            opacity: 1,
            x: 0,
            duration: 0.2,
            delay: 0.06 * i,
            ease: "power2.out",
          });
        });

        container.appendChild(treeDiv);

        gsap.to(headerDiv, { opacity: 1, duration: 0.3, delay: 0.1 });
        gsap.to(treeDiv, { opacity: 1, duration: 0.3, delay: 0.15 });
      }, 300);

      timeout = setTimeout(() => {
        addLine("", "mb-1");
        const promptDiv = addLine(
          '<span style="color:#4ade80">guest@portfolio:~$</span> ',
          "",
        );

        const cursor = document.createElement("span");
        cursor.className =
          "inline-block w-[7px] h-[14px] bg-green-400 ml-0.5 animate-pulse align-middle rounded-sm";
        cursor.style.boxShadow = "0 0 10px rgba(74, 222, 128, 0.6)";
        promptDiv.appendChild(cursor);
      }, 2000);
    };

    timeout = setTimeout(step1, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [showTerminal]);

  return (
    <section
      id="welcome"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none max-sm:h-screen max-sm:w-full max-sm:px-10"
    >
      <div
        ref={crtOverlayRef}
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)",
          opacity: 0.03,
        }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center">
        <p className="text-center relative">
          <span
            ref={subtitleContainerRef}
            className="text-2xl md:text-3xl font-georama tracking-wide"
          />
          {subtitleDone && (
            <span
              ref={cursorRef}
              className="inline-block w-2 h-[1em] bg-red-400 ml-1 animate-pulse align-baseline"
              style={{
                boxShadow:
                  "0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.4)",
              }}
            />
          )}
        </p>

        <h1 className="mt-7 text-center relative">
          <div className="relative inline-block">
            <span
              ref={titleContainerRef}
              className="text-7xl md:text-9xl italic font-georama font-bold"
            />
            <div
              ref={scanlineRef}
              className="absolute left-0 w-full pointer-events-none"
              style={{
                height: "3px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.9) 20%, rgba(239, 68, 68, 1) 50%, rgba(239, 68, 68, 0.9) 80%, transparent 100%)",
                boxShadow:
                  "0 0 30px rgba(239, 68, 68, 0.9), 0 0 80px rgba(239, 68, 68, 0.5), 0 0 120px rgba(239, 68, 68, 0.3)",
                borderRadius: "2px",
                opacity: 0,
              }}
            />
          </div>
        </h1>

        {showTerminal && (
          <div ref={terminalRef} className="mt-12 w-full max-w-7xl">
            <div className="bg-black/95 backdrop-blur-md rounded-xl border border-gray-700/60 shadow-2xl shadow-red-500/5 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900/80 border-b border-gray-800/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 text-[10px] text-gray-500 font-mono">
                  npm install ali-shahbaz — terminal
                </span>
              </div>
              <div className="terminal-content p-4 min-h-20 overflow-x-auto" />
            </div>
          </div>
        )}
      </div>

      <div className="lg:hidden fixed  inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-6">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/10 p-6  w-full text-center">
          <div className="mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-white font-georama font-bold text-lg mb-2">
            Desktop Only
          </h3>
          <div className="w-12 h-0.5 bg-linear-to-r from-red-500 to-transparent mx-auto mb-3" />
          <p className="text-gray-400 font-roboto text-sm leading-relaxed mb-1">
            This Portfolio is designed for
          </p>
          <p className="text-gray-300 font-roboto text-sm font-medium mb-4">
            desktop & tablet screens only
          </p>
          <div className="bg-red-500/10 rounded-lg border border-red-500/20 p-3">
            <p className="text-gray-500 font-roboto text-xs">
              Please switch to a larger screen for the best experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
