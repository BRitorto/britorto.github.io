import React from 'react';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
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
    const [attend, setAttend] = useState();

    const submit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(lastName);
        console.log(mail);
        console.log(attend);
    }

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
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
            </Stack>
            <Stack justifyContent="center" direction="row" spacing={4}>
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
            </Stack>
            <div>
                <Button type="submit" size="medium" variant="contained" onClick={submit}>Submit</Button>
            </div>
        </Stack>
    );
}
