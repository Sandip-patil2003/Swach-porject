import SocietyDetails from "./SocietyDetails";
import SocietyList from "./SocietyList";
import { useState } from "react";

function SocietyMaster() {
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div>
      <SocietyDetails onSuccess={() => setRefreshList(!refreshList)} />
      <SocietyList key={refreshList} />
    </div>
  );
}

export default SocietyMaster;
