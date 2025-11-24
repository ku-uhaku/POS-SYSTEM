import { useRouteError, isRouteErrorResponse } from "react-router";
import Link from "@mui/material/Link";

import GlobalStyles from "@mui/material/GlobalStyles";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
      {inputGlobalStyles()}

      <div className="error-boundary-root">
        <div className="error-boundary-container">
          {renderErrorMessage(error)}
        </div>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

function parseStackTrace(stack) {
  if (!stack) return { filePath: null, functionName: null };

  const filePathMatch = stack.match(/\/src\/[^?]+/);
  const functionNameMatch = stack.match(/at (\S+)/);

  return {
    filePath: filePathMatch ? filePathMatch[0] : null,
    functionName: functionNameMatch ? functionNameMatch[1] : null,
  };
}

function renderErrorMessage(error) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1 className="error-boundary-title">
          {error.status}: {error.statusText}
        </h1>
        <p className="error-boundary-message">{error.data}</p>
      </>
    );
  }

  if (error instanceof Error) {
    const { filePath, functionName } = parseStackTrace(error.stack);

    return (
      <>
        <h1 className="error-boundary-title">Unexpected Application Error!</h1>
        <p className="error-boundary-message">
          {error.name}: {error.message}
        </p>
        <pre className="error-boundary-details">{error.stack}</pre>
        {(filePath || functionName) && (
          <p className="error-boundary-file-path">
            {filePath} ({functionName})
          </p>
        )}
      </>
    );
  }

  return <h1 className="error-boundary-title">Unknown Error</h1>;
}

// ----------------------------------------------------------------------

const cssVars = {
  "--info-color": "#2dd9da",
  "--warning-color": "#e2aa53",
  "--error-color": "#ff5555",
  "--error-background": "#2a1e1e",
  "--details-background": "#111111",
  "--root-background": "#2c2c2e",
  "--container-background": "#1c1c1e",
  "--font-stack-monospace":
    '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  "--font-stack-sans":
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

const rootStyles = {
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
  padding: "10vh 15px 0",
  flexDirection: "column",
  fontFamily: "var(--font-stack-sans)",
};

const contentStyles = {
  gap: 24,
  padding: 20,
  width: "100%",
  maxWidth: 960,
  display: "flex",
  borderRadius: 8,
  flexDirection: "column",
  backgroundColor: "var(--container-background)",
};

const titleStyles = (theme) => ({
  margin: 0,
  lineHeight: 1.2,
  fontSize: theme.typography.pxToRem(20),
  fontWeight: theme.typography.fontWeightBold,
});

const messageStyles = (theme) => ({
  margin: 0,
  lineHeight: 1.5,
  padding: "12px 16px",
  whiteSpace: "pre-wrap",
  color: "var(--error-color)",
  fontSize: theme.typography.pxToRem(14),
  fontFamily: "var(--font-stack-monospace)",
  backgroundColor: "var(--error-background)",
  borderLeft: "2px solid var(--error-color)",
  fontWeight: theme.typography.fontWeightBold,
});

const detailsStyles = {
  margin: 0,
  padding: 16,
  lineHeight: 1.5,
  overflow: "auto",
  borderRadius: "inherit",
  color: "var(--warning-color)",
  backgroundColor: "var(--details-background)",
};

const filePathStyles = {
  marginTop: 0,
  color: "var(--info-color)",
};

const inputGlobalStyles = () => (
  <GlobalStyles
    styles={(theme) => ({
      body: {
        ...cssVars,
        margin: 0,
        color: "white",
        backgroundColor: "var(--root-background)",
        "& .error-boundary-root": rootStyles,
        "& .error-boundary-container": contentStyles,
        "& .error-boundary-title": titleStyles(theme),
        "& .error-boundary-message": messageStyles(theme),
        "& .error-boundary-file-path": filePathStyles,
        "& .error-boundary-details": detailsStyles,
      },
    })}
  />
);

export function RouterLink({ href, ref, ...other }) {
  return <Link ref={ref} to={href} {...other} />;
}
