import React from 'react';
import { useState } from 'react';
import { FormControl, Grid } from '@mui/material';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { ReactComponent as Invitation } from '../invitation-3.svg';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../App.css';
import { decode as base64_decode } from 'base-64';

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

export default function PartyInviteForm() {
    const [attend, setAttend] = useState('yes');
    const params = useParams();
    const json = base64_decode(params.invitationHash);

    const submit = (e) => {
        e.preventDefault();
        console.log("hola");
        /*console.log(name);
        console.log(lastName);
        console.log(mail);
        console.log(attend);*/
        const st = base64_decode('eyJuYW1lIjoiQmlhbmNhIiwibGFzdE5hbWUiOiJSaXRvcnRvIiwicGx1c09uZSI6dHJ1ZX0');
        console.log(st);
        console.log(params);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App" >
                <Stack spacing={4} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ width: '100%' }}>
                        <Invitation style={invitationStyle} />
                    </div>
                    <div>
                        <Grid container justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <p>{json}</p>
                                <p>Fuiste invitado</p>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="attending">¿Asistirás?</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="attending"
                                        defaultValue="yes"
                                        name="radio-buttons-group"
                                        value={attend}
                                        onChange={e => setAttend(e.target.value)} >
                                        <FormControlLabel value="yes" control={<Radio />} label="Si" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} sm={4}>
                                <Button fullWidth type="submit" size="large" variant="outlined" onClick={submit}>Submit</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
            </div>
        </ThemeProvider >
    );
}
