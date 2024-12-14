import React, { useState } from "react";
import {
  Scale,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

const Property = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const lawSections = [
    {
      id: 1,
      title: "Property Purchase Requirements",
      icon: <Scale className="w-6 h-6" />,
      content: {
        overview:
          "Understanding the legal requirements for purchasing property in the state.",
        keyPoints: [
          "Valid identification and proof of residency",
          "Financial documentation requirements",
          "Property insurance requirements",
          "Title search and insurance",
        ],
        details:
          "A complete property purchase requires several legal documents and verifications. Buyers must provide valid identification, proof of income, and meet state-specific requirements. A thorough title search is mandatory to ensure there are no liens or encumbrances on the property.",
      },
    },
    {
      id: 2,
      title: "Financing and Mortgage Laws",
      icon: <FileText className="w-6 h-6" />,
      content: {
        overview:
          "Legal aspects of property financing and mortgage regulations.",
        keyPoints: [
          "Mortgage lending requirements",
          "Interest rate regulations",
          "Down payment requirements",
          "Borrower protections",
        ],
        details:
          "State laws regulate mortgage lending practices, including interest rates, down payment minimums, and disclosure requirements. Lenders must provide clear documentation of all terms and conditions, and borrowers have certain rights and protections under state law.",
      },
    },
    {
      id: 3,
      title: "Property Rights and Restrictions",
      icon: <BookOpen className="w-6 h-6" />,
      content: {
        overview:
          "Understanding property rights, zoning laws, and usage restrictions.",
        keyPoints: [
          "Property ownership rights",
          "Zoning regulations",
          "Usage restrictions",
          "Environmental considerations",
        ],
        details:
          "Property owners have specific rights and responsibilities under state law. These include compliance with zoning regulations, understanding usage restrictions, and adhering to environmental protection requirements. Certain areas may have additional restrictions or requirements.",
      },
    },
  ];

  const handleSectionClick = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Scale className="w-7 h-7 text-blue-600" />
          Property Laws and Regulations
        </h1>
        <p className="text-gray-600">
          Essential information about property laws, regulations, and
          requirements for property purchase in the state.
        </p>
      </div>

      {/* Quick Help Section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-semibold text-blue-800 mb-1">
              Need Legal Assistance?
            </h2>
            <p className="text-blue-700 text-sm">
              Consider consulting with a qualified real estate attorney for
              specific legal advice regarding property purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {lawSections.map((section) => (
          <div
            key={section.id}
            className="border rounded-lg bg-white overflow-hidden"
          >
            <button
              onClick={() => handleSectionClick(section.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <h3 className="font-semibold">{section.title}</h3>
              </div>
              {expandedSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSection === section.id && (
              <div className="p-4 border-t bg-gray-50">
                {/* Overview */}
                <p className="text-gray-600 mb-4">{section.content.overview}</p>

                {/* Key Points */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Points:</h4>
                  <ul className="space-y-2">
                    {section.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Information */}
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Detailed Information:</h4>
                  <p className="text-gray-600">{section.content.details}</p>
                </div>

                {/* Resource Link */}
                <a
                  href="#"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Learn more about {section.title.toLowerCase()}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
