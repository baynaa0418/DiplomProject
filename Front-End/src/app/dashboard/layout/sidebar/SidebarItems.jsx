import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAuth } from "../../context/AuthContext";

const SidebarItems = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { user } = useAuth();

  const menuData = Menuitems(user) || [];

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {menuData.map((item) =>
          item.subheader ? (
            <NavGroup item={item} key={item.id || item.subheader} />
          ) : (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          )
        )}
      </List>
    </Box>
  );
};

export default SidebarItems;
