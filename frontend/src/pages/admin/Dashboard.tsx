import React, { useState } from "react";
import LayoutDesign from "../../components/admin/LayoutDesign";
import "../../assets/css/app.css";
import "../../assets/css/globals.css";
import avatar from "../../assets/images/avatar/avatar-20.jpg";

const Dashboard: React.FC = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isShowPopper, setIsShowPopper] = useState(false);

  return (
    <div>
      <div>
        <LayoutDesign>
          <div className="px-1 sm:px-2 md:px-6">
            <div>Dashboard</div>
          </div>
        </LayoutDesign>
      </div>
    </div>
  );
};

export default Dashboard;
