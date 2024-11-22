import { useState, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";
export const ThemeContext = createContext();

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default to 'light' theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`app-container ${theme}`}>
          {
            boards.length > 0 && (
              <>
                <Header
                  setIsBoardModalOpen={setIsBoardModalOpen}
                  isBoardModalOpen={isBoardModalOpen}
                />
                <Home
                  setIsBoardModalOpen={setIsBoardModalOpen}
                  isBoardModalOpen={isBoardModalOpen}
                />
              </>
            )
            // : (
            //   <>
            //     <EmptyBoard type="add" />
            //   </>
            // )
          }
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
