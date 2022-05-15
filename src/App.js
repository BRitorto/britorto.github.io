import InviteeForm from './InviteeForm';
import { ReactComponent as Invitation } from './invitation.svg';
import Stack from '@mui/material/Stack';


import './App.css';

function App() {
  const invitationStyle = {
    height: 700,
  };

  return (
    <div className="App" >
      <Stack spacing={4} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Invitation style={invitationStyle} />
        <InviteeForm></InviteeForm>
      </Stack>
    </div>
  );
}

export default App;
