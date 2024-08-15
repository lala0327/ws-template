import { Outlet } from 'react-router-dom'
function MainPage() {
  return (
    <>
      <div style={{height:'100%', display:'flex', alignItems:'center', flexDirection:'column'}}>
        <Outlet />
      </div>
    </>
  )
}
export default MainPage
