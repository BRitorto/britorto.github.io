import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, Grid } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { ReactComponent as Invitation } from '../titulo2.svg';
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
            'Nunito'
        ]
    }
});

export default function App() {
    const serverUrl = "https://v3vwjf4yod.execute-api.sa-east-1.amazonaws.com";
    const [attend, setAttend] = useState('yes');
    const [plusOneAttend, setPlusOneAttend] = useState('yes');
    const [searchParams] = useSearchParams();
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [plusOne, setPlusOne] = useState(null);
    const [incorrectPayload, setIncorrectPayload] = useState(false);
    const [success, setSuccess] = useState(null);
    const [plusOneDisabled, setPlusOneDisabled] = useState(false);

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
            "plus_one": plusOne && plusOneAttend === "yes",
            "assists": attend === "yes"
        };
        const response = await fetch(serverUrl + "/default/rsvpLambda",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "X-API-Key": "8Zdq5EMWeB6Wj8MyygW379zc6zMhox3SdOCvYHnd"
                },
                body: JSON.stringify(data),
                mode: "cors"
            })
            .then(response => response.json());
        setSuccess(response.success);
    }

    const disablePlusOne = () => {
        setPlusOneDisabled(true);
    }

    const enablePlusOne = () => {
        setPlusOneDisabled(false);
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
                    <p>Elegante sport</p>
                </Grid>
                <Grid item xs={8} sm={12}>
                    <p className="invitationText"><strong>{firstName}</strong>, te queríamos invitar a nuestro casamiento</p>
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
                            <FormControlLabel value="yes" control={<Radio />} label="Si" sx={{ fontSize: '30px' }} onClick={enablePlusOne} />
                            <FormControlLabel value="no" control={<Radio />} label="No" className="label" onClick={disablePlusOne} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {plusOne === 'true' ? (
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel className="label" id="plusOneAttending"><p>¿Y tu plus one?</p></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="plusOneAttending"
                                defaultValue="yes"
                                value={plusOneAttend}
                                onChange={e => setPlusOneAttend(e.target.value)} >
                                <FormControlLabel value="yes" control={<Radio />} label="Si" disabled={plusOneDisabled} />
                                <FormControlLabel value="no" control={<Radio />} label="No" disabled={plusOneDisabled} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>)
                    : null}
                <Grid item xs={8} sm={4}>
                    <Button sx={{ marginTop: '30px' }} fullWidth type="submit" size="large" variant="outlined" onClick={submit}>Enviar</Button>
                </Grid>
            </Grid >
        );
    }

    const getIncorrectPayloadMessage = () => {
        return <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid className="timePlaceText" item xs={12} sm={12}>
                <p>Evento privado</p>
            </Grid>
        </Grid>;

    }

    const getSuccessMessage = () => {
        return <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid className="timePlaceText" item xs={8} sm={12}>
                <p>¡Tu respuesta fue guardada correctamente!</p>
            </Grid >
            <Grid item xs={6} sm={8}>
                <Button fullWidth size="large" variant="outlined" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20220714T230000Z%2F20220715T050000Z&details=Festejo%20Juan%20%26%20Bian%0AElegante%20sport&location=Victoria%20Brown%2C%20Costa%20Rica%204827%2C%20C1414%20CABA%2C%20Argentina&text=J%26B">Agregar a Calendar</Button>
            </Grid>
        </Grid >;
    }

    const getErrorMessage = () => {
        return <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid className="timePlaceText" item xs={8} sm={12}>
                <p>Ocurrió un error guardando tu respuesta.</p>
                <p>Intenta de nuevo.</p>
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
