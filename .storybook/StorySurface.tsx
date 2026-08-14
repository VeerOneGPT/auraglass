import type { ReactNode } from "react";

export type StoryPreviewMode = "light" | "dark" | "liquid" | "high-contrast";
export type StorySurfaceKind = "component" | "app" | "media" | "plain";

interface StorySurfaceProps {
  children: ReactNode;
  mode: StoryPreviewMode;
  kind?: StorySurfaceKind;
  fullscreen?: boolean;
}

const surfaceByMode: Record<StoryPreviewMode, React.CSSProperties> = {
  light: {
    background:
      "linear-gradient(180deg, #ffffff 0%, #f4f4f4 52%, #e9e9e9 100%)",
    color: "#111827",
  },
  dark: {
    background:
      "linear-gradient(180deg, #0f172a 0%, #111827 52%, #020617 100%)",
    color: "#f8fafc",
  },
  liquid: {
    background:
      "linear-gradient(145deg, #ffffff 0%, #f5f5f5 42%, #eaeaea 100%)",
    color: "#111827",
  },
  "high-contrast": {
    background: "#000",
    color: "#fff",
  },
};

const sceneByKind: Record<StorySurfaceKind, React.CSSProperties> = {
  component: {
    alignItems: "center",
    justifyContent: "center",
  },
  app: {
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  media: {
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(145deg, #ffffff 0%, #f4f4f4 46%, #e9e9e9 100%)",
    color: "#111827",
  },
  plain: {
    alignItems: "stretch",
    justifyContent: "stretch",
    background: "transparent",
  },
};

function LiquidBackdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.92), transparent 34%), linear-gradient(180deg, rgba(255, 255, 255, 0.38), transparent 48%, rgba(15, 23, 42, 0.035))",
      }}
    />
  );
}

export function StorySurface({
  children,
  mode,
  kind = "component",
  fullscreen = false,
}: StorySurfaceProps) {
  const isLiquid = mode === "liquid";
  const backgroundTone = mode === "dark" || mode === "high-contrast" ? "dark" : "light";
  const minHeight = fullscreen ? "100vh" : "calc(100vh - 40px)";
  const padding = fullscreen ? 0 : "clamp(16px, 3vw, 32px)";
  const isComponentSurface = kind === "component";

  return (
    <div
      data-storybook-preview-mode={mode}
      data-storybook-surface={kind}
      data-bg={backgroundTone}
      className={backgroundTone === "dark" ? "glass-on-dark" : "glass-on-light"}
      style={{
        ...surfaceByMode[mode],
        ...sceneByKind[kind],
        position: "relative",
        width: "100%",
        minWidth: 0,
        maxWidth: "100vw",
        minHeight,
        display: "flex",
        boxSizing: "border-box",
        padding,
        overflowX: "hidden",
        overflowY: "auto",
        isolation: "isolate",
      }}
    >
      {isLiquid && kind !== "plain" && <LiquidBackdrop />}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: isComponentSurface ? "fit-content" : "100%",
          maxWidth: isComponentSurface ? "min(100%, 1120px)" : "none",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
