import { useState, useEffect } from "react";
import axios from "axios";
import StateSelector from "../components/features/StateSelector";
import LawChanges from "../components/features/LawChanges";
import EmergencyContacts from "../components/features/EmergencyContacts";
import PageContainer from "../components/layout/PageContainer";

function Dashboard() {
  const [availableStates, setAvailableStates] = useState([]);
  const [sourceState, setSourceState] = useState("");
  const [destinationState, setDestinationState] = useState("");
  const [laws, setLaws] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    const randomState1 = states[Math.floor(Math.random() * states.length)];
    let randomState2;
    do {
      randomState2 = states[Math.floor(Math.random() * states.length)];
    } while (randomState2 === randomState1);

    setSourceState(randomState1);
    setDestinationState(randomState2);

    localStorage.setItem("source", randomState1);
    localStorage.setItem("destination", randomState2);
  }, []);

  const fetchLawComparison = async (source, destination) => {
    if (!source || !destination) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/states/compare",
        {
          source_state: source,
          target_state: destination,
          comparison_type: "laws",
        }
      );

      setLaws(response.data);
    } catch (err) {
      setError(
        err.message || "An error occurred while fetching law comparisons"
      );
      console.error("Error fetching law comparisons:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch laws whenever source or destination state changes
  useEffect(() => {
    localStorage.setItem("source", sourceState);
    localStorage.setItem("destination", destinationState);
    fetchLawComparison(sourceState, destinationState);
  }, [sourceState, destinationState]);

  const handleSourceStateChange = (newState) => {
    setSourceState(newState);
  };

  const handleDestinationStateChange = (newState) => {
    setDestinationState(newState);
  };

  return (
    <PageContainer>
      <StateSelector
        sourceState={sourceState}
        setSourceState={handleSourceStateChange}
        destinationState={destinationState}
        setDestinationState={handleDestinationStateChange}
        availableStates={availableStates}
      />
      <LawChanges laws={laws} loading={loading} error={error} />
      <EmergencyContacts />
    </PageContainer>
  );
}

export default Dashboard;
