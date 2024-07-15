import { useLoaderData } from "react-router-dom";
import Notifications from "../../../components/Notifications/Notifications";
import NotificationSetting from "../../../components/Notifications/NotificationSetting";

function NotificationPage() {
  const { notifications, limitNoti } = useLoaderData();

  return (
    <section className="section-bg">
      <div className="container h-100vh">
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-6 col-12">
            <div className="tour-content p-0">
              <Notifications notifications={notifications} limit={limitNoti} />
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-12">
            <div className="tour-content p-0 sticky">
              <NotificationSetting />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotificationPage;
