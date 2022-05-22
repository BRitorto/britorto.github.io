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
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [plusOne, setPlusOne] = useState(null);
    const [incorrectPayload, setIncorrectPayload] = useState(false);
    const [success, setSuccess] = useState(null);

    const decodeData = () => {
        const data = base64_decode(searchParams.get('i'));
        if (data) {
            try {
                const person = data.split(",", 4);
                if (person.length !== 4) {
                    setIncorrectPayload(true);
                }
                setId(person[0]);
                setFirstName(person[1]);
                setLastName(person[2]);
                setPlusOne(person[3]);
            } catch (e) {
                setIncorrectPayload(true);
            }
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            "operation": "update",
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "plus_one": plusOneAttend === "yes",
            "assists": attend === "yes"
        };
        const response = await fetch("/default/rsvpLambda",
            {
                method: "POST",
                headers: {
                    "content_type": "application/json; charset=utf-8",
                    "X-API-Key": "8Zdq5EMWeB6Wj8MyygW379zc6zMhox3SdOCvYHnd"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json());
        setSuccess(response.success);
    }

    useEffect(() => {
        decodeData()
    })

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

    const getSuccessMessage = () => {
        return <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid className="timePlaceText" item xs={12}>
                <p>¡Tu respuesta fue guardada correctamente!</p>
            </Grid>
        </Grid>;
    }

    const getErrorMessage = () => {
        return <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid className="timePlaceText" item xs={12}>
                <p>¡Tu respuesta fue guardada correctamente!</p>
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
                    <div> {
                        success === null ?
                            (incorrectPayload === true ? getIncorrectPayloadMessage() : getInviteForm()) :
                            (success ? getSuccessMessage() : getErrorMessage())
                    }
                    </div>
                </Stack>
            </div>
        </ThemeProvider >
    );
}
