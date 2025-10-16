import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import { router } from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
