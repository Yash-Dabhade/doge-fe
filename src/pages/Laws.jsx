import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, ExternalLink, Info, Loader2 } from "lucide-react";

const Laws = () => {
  const [selectedCategory, setSelectedCategory] = useState("laws");
  const [laws, setLaws] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: "property", label: "Property" },
    { id: "taxes", label: "Taxes" },
    { id: "education", label: "Education" },
  ];

  const fetchLaws = async (category) => {
    setIsLoading(true);
    setError(null);
    let source = localStorage.getItem("source") || "california";
    let destination = localStorage.getItem("destination") || "texas";
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1/states/compare",
        {
          source_state: source,
          target_state: destination,
          comparison_type: category,
        }
      );
      console.log(response);
      setLaws(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch laws");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLaws(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 flex flex-col items-center gap-2">
            <BookOpen className="w-12 h-12 text-blue-600" />
            State Laws Comparison
          </h1>
          <p className="mt-2 text-xl text-blue-700">
            Understand the differences, make informed decisions
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-lg font-bold uppercase tracking-wide transition-colors
                  ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-red-600 text-xl">
              <Info className="w-8 h-8" />
              <p>{error}</p>
            </div>
            <button
              onClick={() => fetchLaws(selectedCategory)}
              className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-bold tracking-wide uppercase hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid gap-8">
            {laws.map((law) => (
              <div
                key={law.id}
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
                  {law.title}
                </h2>

                <p className="text-lg sm:text-xl text-blue-600 mb-6 font-semibold">
                  {law.impact}
                </p>

                <p className="text-lg text-gray-700 mb-4">{law.description}</p>

                <p className="text-gray-500 mb-6">
                  Reference: {law.state_reference}
                </p>

                <a
                  href={law.source_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 text-lg font-semibold hover:text-blue-800 hover:underline"
                >
                  <ExternalLink className="w-6 h-6" />
                  View Source
                </a>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && laws.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">
              No laws found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Laws;
