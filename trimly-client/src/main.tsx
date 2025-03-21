import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProviders } from "@/hooks/ui/providers/AppProviders.tsx";

createRoot(document.getElementById("root")!).render(
	<AppProviders>
		<App />
	</AppProviders>
);
