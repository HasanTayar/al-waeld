import Home from "@/pages/home";
import LangTabs from "./common/lang-tabs";
import { Edit2Icon } from "lucide-react";
import { Button } from "../ui/button";

const DisplayHomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <LangTabs />
          <Button
            size="icon"
            variant="outline"
            className="text-gray-600 hover:text-gray-800"
          >
            <Edit2Icon className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <Home />
        </div>
      </main>
      <footer className="bg-white shadow mt-8 p-4 flex justify-center items-center">
        <a
          href="https://quantumpinnaclematrix.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/poweredByQPM.svg"
            alt="Powered by Quantum Pinnacle Matrix"
            className="w-22 h-20"
          />
        </a>
      </footer>
    </div>
  );
};

export default DisplayHomePage;
