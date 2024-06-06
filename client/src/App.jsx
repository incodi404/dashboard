import Relevance from "./components/Relevance";
import Intensity from "./components/Intensity";
import Likelihood from "./components/Likelihood";
import FilterParamsContextProvider from "./context/FilterContextProvider";
import Filter from "./components/Filter";

function App() {
  return (
    <FilterParamsContextProvider>
      <header className="px-7 py-4 bg-black mb-5">
        <nav>
          <h1 className="text-3xl font-bold text-white">DASHBOARD</h1>
        </nav>
      </header>
      <Filter />
      <div className="flex flex-col">
        <div>
          <Intensity />
        </div>
        <div className="flex justify-center">
          <Likelihood />
          <Relevance />
        </div>
      </div>
    </FilterParamsContextProvider>
  );
}

export default App;
