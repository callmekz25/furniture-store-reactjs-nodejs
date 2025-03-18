import Kitchen from "../assets/kitchen.avif";
import Bedroom from "../assets/bedroom.avif";
import LivingRoom from "../assets/livingroom.avif";
import WorkRoom from "../assets/workspace.avif";
const COLLECTIONS = [
  {
    label: "Phòng khách",
    slug: "noi-that-phong-khach",
    image: LivingRoom,
  },
  {
    label: "Phòng ngủ",
    slug: "noi-that-phong-ngu",
    image: Bedroom,
  },
  {
    label: "Phòng ăn và bếp",
    slug: "noi-that-phong-bep",
    image: Kitchen,
  },
  {
    label: "Phòng làm việc",
    slug: "noi-that-van-phong",
    image: WorkRoom,
  },
];
export default COLLECTIONS;
