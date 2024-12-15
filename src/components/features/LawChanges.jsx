import {
  Scale,
  DollarSign,
  Car,
  Briefcase,
  Home,
  GraduationCap,
} from "lucide-react";

const iconMap = {
  "Tax Rates": DollarSign,
  "Vehicle Registration": Car,
  "Employment Laws": Briefcase,
  "Property Laws": Home,
  Education: GraduationCap,
};

function LawChanges({ laws, loading, error }) {
  if (!laws) return null;

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Scale className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Top Law Changes
          </h2>
        </div>
        <div className="space-y-3">
          {laws.map((law, index) => {
            const Icon = iconMap[law.title] || Scale;

            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {law.title}
                  </h3>
                  <p className="text-sm text-gray-600 break-words">
                    {law.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LawChanges;
