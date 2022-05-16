import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, Grid } from '@mui/material';
import { useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [plusOne, setPlusOne] = useState(null);

    const decodeData = () => {
        const json = base64_decode(searchParams.get('data'));
        if (json) {
            try {
                const person = JSON.parse(json);
                //console.log(person);
                setFirstName(person.firstName);
                setLastName(person.lastName);
                setPlusOne(person.plusOne)
            } catch (e) {
                alert("Tienes mal el link");
            }
        }
    }

    useEffect(() => {
        decodeData()
    })

    const submit = (e) => {
        e.preventDefault();
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
                                <p>{firstName}</p>
                                <p>{lastName}</p>
                                <p>Fuiste invitado</p>
                                {plusOne ? <p>Con plus one</p> : null}
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
