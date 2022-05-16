import InviteeForm from './InviteeForm';
import { ReactComponent as Invitation } from './invitation-3.svg';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const invitationStyle = {
  minHeight: 400,
  maxHeight: 600,
  marginTop: 0,
  marginBottom: 0,
  marginRight: "auto"
};

function App() {


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App" >
        <Stack spacing={4} sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div>
            <Invitation style={invitationStyle} />
          </div>
          <div>
            <InviteeForm></InviteeForm>
          </div>
        </Stack>
      </div>
    </ThemeProvider >
  );
}

export default App;