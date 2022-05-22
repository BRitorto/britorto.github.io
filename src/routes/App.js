import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, Grid } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { ReactComponent as Invitation } from '../titulo.svg';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../App.css';
import { decode as base64_decode } from 'base-64';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: [
            'Avenir Next Condensed Ultra Light'
        ]
    }
});

export default function App() {
    const [attend, setAttend] = useState('yes');
    const [plusOneAttend, setPlusOneAttend] = useState('yes');
    const [searchParams] = useSearchParams();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [plusOne, setPlusOne] = useState(null);
    const [incorrectPayload, setIncorrectPayload] = useState(false);

    const decodeData = () => {
        const json = base64_decode(searchParams.get('i'));
        if (json) {
            try {
                const person = JSON.parse(json);
                setFirstName(person.f);
                setLastName(person.l);
                setPlusOne(person.p)
            } catch (e) {
                setIncorrectPayload(true);
            }
        }
    }

    useEffect(() => {
        decodeData()
    })

    const submit = (e) => {
        e.preventDefault();
    }

    const getInviteForm = () => {
        return (
            <Grid container justifyContent="center" alignItems="center" spacing={0}>
                <Grid className="timePlaceText" item xs={12}>
                    <p>Victoria Brown Bar</p>
                    <p>8:00 PM</p>
                    <p>Elegante Sport</p>
                </Grid>
                <Grid item xs={12}>
                    <p className="invitationText"><strong>{firstName}{' '}{lastName}</strong>, te queríamos invitar a nuestro casamiento</p>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel className="label" id="attending"><p>¿Venis?</p></FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="attending"
                            defaultValue="yes"
                            value={attend}
                            onChange={e => setAttend(e.target.value)} >
                            <FormControlLabel value="yes" control={<Radio />} label="Si" sx={{ fontSize: '30px' }} />
                            <FormControlLabel value="no" control={<Radio />} label="No" className="label" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {plusOne ? (
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel className="label" id="plusOneAttending"><p>¿Y tu plus one?</p></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="plusOneAttending"
                                defaultValue="yes"
                                value={plusOneAttend}
                                onChange={e => setPlusOneAttend(e.target.value)} >
                                <FormControlLabel value="yes" control={<Radio />} label="Si" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>)
                    : null}
                <Grid item xs={8} sm={4}>
                    <Button sx={{ marginTop: '30px' }} fullWidth type="submit" size="large" variant="outlined" onClick={submit}>Submit</Button>
                </Grid>
            </Grid >
        );
    }

    const getIncorrectPayloadMessage = () => {
        return <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid className="timePlaceText" item xs={12}>
                <p>Evento privado</p>
                <p>Pediles el link de la invitación a los organizadores</p>
            </Grid>
        </Grid>;

    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App" >
                <Stack spacing={0} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ width: '100%' }}>
                        <Invitation className='invitationStyle' />
                    </div>
                    <div> {incorrectPayload === true ? getIncorrectPayloadMessage() : getInviteForm()}
                    </div>
                </Stack>
            </div>
        </ThemeProvider >
    );
}
