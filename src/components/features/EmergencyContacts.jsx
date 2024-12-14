import { Phone, AlertTriangle, Scale, Heart } from "lucide-react";

// Emergency contact data
const emergencyContacts = [
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

// Component to display emergency contact information
function EmergencyContacts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="h-5 w-5 text-red-600" />
          <h2 className="text-lg font-semibold">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {emergencyContacts.map(
            ({ id, title, number, icon: Icon, iconColor }) => (
              <div
                key={id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  <span className="font-medium">{title}</span>
                </div>
                <div className="text-lg font-semibold">{number}</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default EmergencyContacts;
