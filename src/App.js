import "./App.css";
import Movies from "./pages";
import { MovieProvider } from "./context";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Movies />
      </MovieProvider>
    </div>
  );
}

export default App;
