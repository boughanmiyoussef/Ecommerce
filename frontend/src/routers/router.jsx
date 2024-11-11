import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import Home from "../pages/home/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children:[
            { path: "/", element : <Home/>},
            { path: "/categories/:categoryName", element : <div>djfdsbfsdbkdsfsbbfdsfbdsk</div>},

        ]
    },
]);


export default router;