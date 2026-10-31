import {
  Bed,
  BrickWall,
  Briefcase,
  Bus,
  Car,
  CarFront,
  CloudFog,
  Cylinder,
  Droplet,
  Flame,
  Fuel,
  Heater,
  Laptop,
  Leaf,
  Paperclip,
  Pickaxe,
  Plane,
  PlugZap,
  Recycle,
  Ship,
  Snowflake,
  Sprout,
  ThermometerSnowflake,
  TrainFront,
  TramFront,
  Trash,
  Truck,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { colors } from '../theme';

const ICONS: Record<EmissionCategoryKey, LucideIcon> = {
  diesel: Fuel,
  petrol: Car,
  naturalGas: Flame,
  electricity: Zap,
  lpg: Cylinder,
  heatingOil: Droplet,
  coal: Pickaxe,
  biodiesel: Leaf,
  bioethanol: Sprout,
  woodPellets: Leaf,
  biomethane: Flame,
  refrigerants: ThermometerSnowflake,
  evKm: PlugZap,
  districtHeat: Heater,
  steam: CloudFog,
  districtCooling: Snowflake,
  spendOfficeSupplies: Paperclip,
  spendItHardware: Laptop,
  spendServices: Briefcase,
  spendFoodCatering: UtensilsCrossed,
  spendConstruction: BrickWall,
  waterM3: Droplet,
  freightRoadTkm: Truck,
  freightRailTkm: TrainFront,
  freightSeaTkm: Ship,
  freightAirTkm: Plane,
  wasteLandfillTonnes: Trash,
  wasteRecycledTonnes: Recycle,
  flightShortHaulKm: Plane,
  flightLongHaulKm: Plane,
  railKm: TrainFront,
  carKm: CarFront,
  hotelNights: Bed,
  commuteCarKm: CarFront,
  commutePublicTransportKm: Bus,
  commuteRailKm: TramFront,
};

/** Line icon for an emission source (Lucide, 1.75 px stroke). */
export function CategoryIcon({
  category,
  size = 20,
  color = colors.inkSecondary,
}: {
  category: EmissionCategoryKey;
  size?: number;
  color?: string;
}) {
  const Icon = ICONS[category] ?? Zap;
  return <Icon size={size} color={color} strokeWidth={1.75} />;
}
