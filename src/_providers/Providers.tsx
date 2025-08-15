import { ThemeContextProvider } from "@/_context/ThemeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

export default Providers;
