import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <main className={`${poppins.className} mx-auto w-full` }>
        <Component {...pageProps} />
      </main>
    </AnimatePresence>
  );
}
