import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useState} from "react";
  
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import SignUpPage from "./SignUpPage";
import NewEntry from "./NewEntry";
  
import UserContext from "../context/UserContext";
  
function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/new-entry" element={<NewEntry />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    );
}
  
export default App;