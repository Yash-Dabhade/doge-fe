import { AlertTriangle, Scale, Heart } from "lucide-react";

export const emergencyContacts = [
  {
    id: 1,
    title: "Emergency",
    number: "911",
    icon: AlertTriangle,
    iconColor: "text-red-500",
  },
  {
    id: 2,
    title: "Police",
    number: "311",
    icon: Scale,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    title: "Healthcare",
    number: "211",
    icon: Heart,
    iconColor: "text-pink-500",
  },
];
