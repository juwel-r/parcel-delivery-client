import { Outlet } from "react-router";
import CommonLayout from "./components/Layouts/CommonLayout";

function App() {
  return (
    <div>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
