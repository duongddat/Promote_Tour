import { Outlet } from "react-router-dom";

import UserSettingLayout from "../components/Layout/UserSettingLayout";

function RootUserPage() {
  return (
    <UserSettingLayout>
      <Outlet />
    </UserSettingLayout>
  );
}

export default RootUserPage;
