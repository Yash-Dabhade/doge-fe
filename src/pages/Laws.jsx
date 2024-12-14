import React from "react";
import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Shield,
  Info,
  AlertCircle,
} from "lucide-react";

const Laws = () => {
  // Sample rules data - in a real app, this would likely be passed as props
  const rules = [
    {
      id: 1,
      title: "Authentication Required",
      description:
        "All API endpoints must require proper authentication tokens for access. This ensures secure data transmission and prevents unauthorized access to sensitive information.",
      impact: "high",
      source: "https://security-guidelines.com/auth",
    },
    {
      id: 2,
      title: "Input Validation",
      description:
        "All user inputs must be validated and sanitized before processing. This prevents SQL injection, XSS attacks, and other security vulnerabilities.",
      impact: "medium",
      source: "https://security-guidelines.com/validation",
    },
    {
      id: 3,
      title: "Rate Limiting",
      description:
        "Implement rate limiting on all public APIs to prevent abuse and ensure fair usage. This helps maintain service stability and prevents DoS attacks.",
      impact: "low",
      source: "https://security-guidelines.com/rate-limiting",
    },
  ];

  // Function to render impact icon based on severity
  const getImpactIcon = (impact) => {
    switch (impact.toLowerCase()) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "low":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  // Function to get impact badge color
  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        Security Rules and Guidelines
      </h1>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            {/* Rule Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                {getImpactIcon(rule.impact)}
                <h2 className="text-lg font-semibold">{rule.title}</h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(
                  rule.impact
                )}`}
              >
                {rule.impact.charAt(0).toUpperCase() + rule.impact.slice(1)}
              </span>
            </div>

            {/* Rule Description */}
            <p className="mt-2 text-gray-600">{rule.description}</p>

            {/* Source Link */}
            <a
              href={rule.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              View Source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laws;
