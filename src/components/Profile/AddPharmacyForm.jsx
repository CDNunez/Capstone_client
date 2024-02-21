import React, { useRef, useContext } from 'react';
import { Button, TextField, Box, Card, CardContent, Grid } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';

function AddPharmacyForm() {
    const nameRef = useRef();
    const addressRef = useRef();
    const phoneNumberRef = useRef();

    const { createPharmacy } = useContext(ProfileContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const pharmacy = {
            name: nameRef.current.value,
            address: addressRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
        };

        await createPharmacy(pharmacy);

        nameRef.current.value = '';
        addressRef.current.value = '';
        phoneNumberRef.current.value = '';
    };

    return (
        <Card style={{ maxWidth: '600px' }}>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField inputRef={nameRef} label="Name" required fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField inputRef={addressRef} label="Address" required fullWidth />
						</Grid>
                        <Grid item xs={12}>
                            <TextField inputRef={phoneNumberRef} label="Phone Number" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add Pharmacy
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AddPharmacyForm;