"use client";

import React from "react";
import { OptimizedGlass } from "../../primitives";
import { cn } from "../../lib/utilsComprehensive";

type DiffKind = "unchanged" | "added" | "removed";

interface DiffRow {
  kind: DiffKind;
  oldLine?: number;
  newLine?: number;
  text: string;
}

export interface GlassDiffViewerProps {
  left?: string;
  right?: string;
  sideBySide?: boolean;
  mode?: "split" | "unified";
  language?: string;
  compact?: boolean;
  maxHeight?: number | string;
  showLineNumbers?: boolean;
  className?: string;
  "data-testid"?: string;
}

const DEFAULT_LEFT = 'export const greet = () => "hello";\n';
const DEFAULT_RIGHT =
  "export const greet = (name: string) => `hello, ${name}`;\n";

function toCssSize(value: number | string | undefined): string | undefined {
  return typeof value === "number" ? `${value}px` : value;
}

function splitLines(value: string): string[] {
  const lines = value.replace(/\r\n/g, "\n").split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return lines.length ? lines : [""];
}

function buildUnifiedRows(left: string, right: string): DiffRow[] {
  const leftLines = splitLines(left);
  const rightLines = splitLines(right);
  const max = Math.max(leftLines.length, rightLines.length);
  const rows: DiffRow[] = [];

  for (let i = 0; i < max; i += 1) {
    const oldText = leftLines[i];
    const newText = rightLines[i];
    const hasOld = oldText !== undefined;
    const hasNew = newText !== undefined;

    if (hasOld && hasNew && oldText === newText) {
      rows.push({
        kind: "unchanged",
        oldLine: i + 1,
        newLine: i + 1,
        text: oldText,
      });
      continue;
    }

    if (hasOld) {
      rows.push({
        kind: "removed",
        oldLine: i + 1,
        text: oldText,
      });
    }

    if (hasNew) {
      rows.push({
        kind: "added",
        newLine: i + 1,
        text: newText,
      });
    }
  }

  return rows;
}

function rowStyle(kind: DiffKind): React.CSSProperties {
  if (kind === "added") {
    return {
      background: "rgba(255, 255, 255, 0.22)",
      boxShadow: "inset 3px 0 0 rgba(15, 23, 42, 0.48)",
    };
  }

  if (kind === "removed") {
    return {
      background: "rgba(15, 23, 42, 0.055)",
      boxShadow: "inset 3px 0 0 rgba(15, 23, 42, 0.72)",
    };
  }

  return {};
}

function signFor(kind: DiffKind): string {
  if (kind === "added") return "+";
  if (kind === "removed") return "-";
  return " ";
}

function labelFor(kind: DiffKind): string {
  if (kind === "added") return "Added line";
  if (kind === "removed") return "Removed line";
  return "Unchanged line";
}

function DiffTable({
  rows,
  compact,
  showLineNumbers,
}: {
  rows: DiffRow[];
  compact: boolean;
  showLineNumbers: boolean;
}) {
  return (
    <table
      role="table"
      aria-label="Code diff"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
        fontSize: compact ? "0.72rem" : "0.78rem",
        lineHeight: compact ? 1.35 : 1.5,
        color: "rgba(15, 23, 42, 0.92)",
      }}
    >
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={`${row.kind}-${row.oldLine ?? "x"}-${row.newLine ?? "x"}-${index}`}
            data-diff-kind={row.kind}
            aria-label={labelFor(row.kind)}
            style={rowStyle(row.kind)}
          >
            <td
              aria-hidden
              style={{
                width: compact ? 22 : 26,
                padding: compact ? "1px 4px" : "2px 6px",
                textAlign: "center",
                color: "rgba(15, 23, 42, 0.72)",
                userSelect: "none",
              }}
            >
              {signFor(row.kind)}
            </td>
            {showLineNumbers && (
              <td
                aria-hidden
                style={{
                  width: compact ? 44 : 56,
                  padding: compact ? "1px 4px" : "2px 6px",
                  color: "rgba(15, 23, 42, 0.62)",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.oldLine ?? ""} {row.newLine ?? ""}
              </td>
            )}
            <td style={{ padding: compact ? "1px 6px" : "2px 8px" }}>
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                <code>{row.text || " "}</code>
              </pre>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CodePanel({
  label,
  code,
  compact,
}: {
  label: string;
  code: string;
  compact: boolean;
}) {
  return (
    <OptimizedGlass
      elevation={"level1"}
      className="glass-radius-lg glass-border glass-border-white/15 glass-overflow-auto"
      style={{
        padding: compact ? "0.5rem" : "0.75rem",
        minWidth: 0,
        background: "rgba(255, 255, 255, 0.24)",
        border: "1px solid rgba(255, 255, 255, 0.68)",
        color: "rgba(15, 23, 42, 0.92)",
        boxShadow:
          "0 12px 30px rgba(15, 23, 42, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.30), inset 0 0 16px rgba(255, 255, 255, 0.14)",
      }}
    >
      <div
        style={{
          marginBottom: compact ? 4 : 6,
          fontSize: compact ? "0.62rem" : "0.68rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(15, 23, 42, 0.64)",
        }}
      >
        {label}
      </div>
      <pre
        className="glass-text-primary-glass-opacity-80"
        style={{
          margin: 0,
          fontSize: compact ? "0.72rem" : "0.78rem",
          lineHeight: compact ? 1.35 : 1.5,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          color: "rgba(15, 23, 42, 0.92)",
        }}
      >
        <code>{code}</code>
      </pre>
    </OptimizedGlass>
  );
}

export function GlassDiffViewer({
  left = DEFAULT_LEFT,
  right = DEFAULT_RIGHT,
  sideBySide = false,
  mode,
  language,
  compact = false,
  maxHeight,
  showLineNumbers = true,
  className,
  "data-testid": dataTestId,
}: GlassDiffViewerProps) {
  const resolvedMode = mode ?? (sideBySide ? "split" : "unified");
  const rows = React.useMemo(
    () => buildUnifiedRows(left, right),
    [left, right]
  );

  return (
    <div
      data-glass-component
      data-language={language}
      data-testid={dataTestId}
      className={cn("glass-w-full", className)}
      style={{
        maxHeight: toCssSize(maxHeight),
        overflow: maxHeight ? "auto" : undefined,
      }}
    >
      {resolvedMode === "split" ? (
        <div
          className="glass-grid glass-gap-3"
          style={{
            gridTemplateColumns: compact
              ? "1fr"
              : "repeat(auto-fit, minmax(min(18rem, 100%), 1fr))",
          }}
        >
          <CodePanel label="Before" code={left} compact={compact} />
          <CodePanel label="After" code={right} compact={compact} />
        </div>
      ) : (
        <OptimizedGlass
          elevation={"level1"}
          className="glass-radius-lg glass-border glass-border-white/15 glass-overflow-hidden"
          style={{
            padding: compact ? "0.35rem" : "0.5rem",
            minWidth: 0,
            background: "rgba(255, 255, 255, 0.24)",
            border: "1px solid rgba(255, 255, 255, 0.68)",
            color: "rgba(15, 23, 42, 0.92)",
            boxShadow:
              "0 12px 30px rgba(15, 23, 42, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.30), inset 0 0 16px rgba(255, 255, 255, 0.14)",
          }}
        >
          <DiffTable
            rows={rows}
            compact={compact}
            showLineNumbers={showLineNumbers}
          />
        </OptimizedGlass>
      )}
    </div>
  );
}

export default GlassDiffViewer;
