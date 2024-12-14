import StateSelector from "../components/features/StateSelector";
import LawChanges from "../components/features/LawChanges";
import EmergencyContacts from "../components/features/EmergencyContacts";
import PageContainer from "../components/layout/PageContainer";

// Main dashboard page that combines all feature components
function Dashboard() {
  return (
    <PageContainer>
      <StateSelector />
      <LawChanges />
      <EmergencyContacts />
    </PageContainer>
  );
}

export default Dashboard;
