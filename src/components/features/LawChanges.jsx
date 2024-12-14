import {
  Scale,
  DollarSign,
  Car,
  Briefcase,
  Home,
  GraduationCap,
} from "lucide-react";

// Data for law changes
const lawChanges = [
  {
    id: 1,
    title: "Tax Rates",
    icon: DollarSign,
    difference: "State tax rate varies by 5%",
  },
  {
    id: 2,
    title: "Vehicle Registration",
    icon: Car,
    difference: "Annual vs Biennial registration",
  },
  {
    id: 3,
    title: "Employment Laws",
    icon: Briefcase,
    difference: "At-will employment policies",
  },
  {
    id: 4,
    title: "Property Laws",
    icon: Home,
    difference: "Different homestead exemptions",
  },
  {
    id: 5,
    title: "Education",
    icon: GraduationCap,
    difference: "School district regulations",
  },
];

// Component to display law changes between states
function LawChanges() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Scale className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Top Law Changes</h2>
        </div>
        <div className="space-y-3">
          {lawChanges.map(({ id, title, icon: Icon, difference }) => (
            <div
              key={id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <Icon className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-gray-600">{difference}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LawChanges;
