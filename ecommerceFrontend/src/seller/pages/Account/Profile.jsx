import React from "react";
import ProfileDetailsCard from "./ProfileDetailsCard";
import BusinessDetailsCard from "./BusinessDetailsCard";
import PickupAddressCard from "./PickupAddress";
import BankDetailsCard from "./BankDetailsCard";

const Profile = () => {
  return (
    <div className="flex flex-col gap-20">
      <div>
        <ProfileDetailsCard />
      </div>
      <div>
        <BusinessDetailsCard />
      </div>
      <div>
        <PickupAddressCard />
      </div>
      <div>
        <BankDetailsCard />
      </div>
    </div>
  );
};

export default Profile;
