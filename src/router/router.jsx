import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SearchResults from "../componentes/SearchResults ";




const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>
    },
    {
        path:`https://vidsrc.xyz/embed/movie/id`,
       
    },
    {
        path: `/search-result`,
        element: <SearchResults></SearchResults>
    },

])

export default router