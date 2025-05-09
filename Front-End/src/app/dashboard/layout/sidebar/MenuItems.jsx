import { uniqueId } from "lodash";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import SummarizeIcon from "@mui/icons-material/Summarize";
import VaccinesIcon from "@mui/icons-material/Vaccines";

const Menuitems = (user) => {
  const baseMenu = [
    {
      navlabel: true,
      subheader: "Үндсэн цэс",
    },
    {
      id: uniqueId(),
      title: "Хянах самбар",
      icon: DashboardOutlinedIcon,
      href: "/dashboard/home",
    },
    {
      id: uniqueId(),
      title: "Амин үзүүлэлт",
      icon: BloodtypeIcon,
      href: "/dashboard/vitals",
    },
    {
      id: uniqueId(),
      title: "Эмчилгээ",
      icon: VaccinesIcon,
      href: "/dashboard/treatment",
    },
    {
      id: uniqueId(),
      title: "Үйлчлүүлэгч",
      icon: SickOutlinedIcon,
      href: "/dashboard/customer",
    },
    {
      id: uniqueId(),
      title: "Материал зарцуулалт",
      icon: MedicalServicesOutlinedIcon,
      href: "/dashboard/pharmacy",
    },
    {
      id: uniqueId(),
      title: "Тайлан",
      icon: SummarizeIcon,
      href: "/dashboard/report",
    },
    {
      id: uniqueId(),
      title: "Үзлэг",
      icon: MedicalServicesIcon,
      href: "/examination",
    },
    {
      id: uniqueId(),
      title: "Ажилтан",
      icon: Person3OutlinedIcon,
      href: "/dashboard/employee",
    },
  ];

  let menuData = [...baseMenu];

  // Check if user exists and has the correct structure
  if (user && user.user && user.user.role) {
    if (user.user.role === "doctor") {
      menuData = [...baseMenu];
    }
  }

  return menuData;
};

export default Menuitems;
