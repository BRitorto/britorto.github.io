import React from 'react';
import { useState } from 'react';
import { FormControl, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


export default function InviteeForm() {
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [mail, setMail] = useState();
    const [attend, setAttend] = useState('yes');

    const submit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(lastName);
        console.log(mail);
        console.log(attend);
    }

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={3}>
                <FormControl>
                    <InputLabel required htmlFor="name">Nombre</InputLabel>
                    <OutlinedInput
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Nombre"
                        required
                        autoFocus
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl>
                    <InputLabel required htmlFor="lastName">Apellido</InputLabel>
                    <OutlinedInput
                        id="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        label="Apellido"
                        required
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl>
                    <InputLabel required htmlFor="mail">Mail</InputLabel>
                    <OutlinedInput
                        id="mail"
                        value={mail}
                        onChange={e => setMail(e.target.value)}
                        label="Mail"
                        required
                    />
                </FormControl>
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
            <Grid item xs={12}>
                <Button type="submit" size="large" variant="contained" onClick={submit}>Submit</Button>
            </Grid>
        </Grid>
    );
}
