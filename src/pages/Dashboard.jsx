import { useState, useEffect } from "react";
import axios from "axios";
import StateSelector from "../components/features/StateSelector";
import LawChanges from "../components/features/LawChanges";
import PageContainer from "../components/layout/PageContainer";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [availableStates, setAvailableStates] = useState([]);
  const [sourceState, setSourceState] = useState("");
  const [destinationState, setDestinationState] = useState("");
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("source", sourceState);
    localStorage.setItem("destination", destinationState);
  }, [destinationState, sourceState]);

  useEffect(() => {
    const states = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];

    setAvailableStates(states);

    // Set random default states

    setSourceState("California");
    setDestinationState("Texas");
    localStorage.setItem("source", "California");
    localStorage.setItem("destination", "Texas");
    // setLoading(true);
    // setError(null);
    // axios
    //   .post(import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1/dashboard/", {
    //     source_state: "California",
    //     target_state: "Texas",
    //   })
    //   .then((res) => {
    //     setLaws(res.data);
    //   })
    //   .catch((err) => {
    //     setError(err.message || "An error occurred while fetching law data");
    //     console.error("Error fetching law data:", err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  const fetchLaws = async () => {
    if (!sourceState || !destinationState) {
      setError("Please select both states before comparing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1/dashboard/",
        {
          source_state: sourceState,
          target_state: destinationState,
        }
      );

      setLaws(response.data);
      localStorage.setItem("source", sourceState);
      localStorage.setItem("destination", destinationState);
    } catch (err) {
      setError(err.message || "An error occurred while fetching law data");
      console.error("Error fetching law data:", err);
    } finally {
      setLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center w-full p-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );

  return (
    <PageContainer>
      <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <StateSelector
            sourceState={sourceState}
            setSourceState={setSourceState}
            destinationState={destinationState}
            setDestinationState={setDestinationState}
            availableStates={availableStates}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={fetchLaws}
              disabled={loading || !sourceState || !destinationState}
              className={`px-4 py-2 rounded-md 
                ${
                  loading || !sourceState || !destinationState
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } 
                inline-flex items-center gap-2`}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Compare States
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-red-500 p-4 text-center">{error}</div>
          ) : laws.length ? (
            <LawChanges laws={laws} loading={loading} error={error} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
