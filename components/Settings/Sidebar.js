import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/settings/general">Generel</Link>
        </li>
        <li>
          <Link href="/settings/stats">Stats</Link>
        </li>
        <li>
          <Link href="/settings/patchnotes">Opdateringer</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
