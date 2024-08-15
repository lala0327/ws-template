import { useRoutes } from "react-router-dom"
import MainPage from "../page/MainPage"

const AllRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainPage />,
      children:[
      
      ],
    },
  ])
}

export default AllRoutes