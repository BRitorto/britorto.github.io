import InviteeForm from './InviteeForm';
import Box from '@mui/material/Box';

import './App.css';

function App() {
  return (
    <div className="App" >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <InviteeForm></InviteeForm>
      </Box>
    </div>
  );
}

export default App;
