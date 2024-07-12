import {Route, Routes} from "react-router-dom";
import Maekey from "./Maekey.tsx";
import {TouchDown} from "./TouchDown.tsx";

export const App = () => {
    return (
        <Routes>
            <Route path="/maekey" element={<Maekey/>}/>
            <Route path="/touchdown" element={<TouchDown />}/>
        </Routes>
    )
}