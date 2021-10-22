import React from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { Typography, Button, Grid, Paper, CircularProgress } from "@material-ui/core";

import Contact from './Contact/Contact';

const Contacts = (props) => {
    const { currentId, setCurrentId, handleAddContact, nameAvatar, handleEditContact, searchQuery, results, setShowDeleteContact } = props;
    const { contacts, isLoading } = useSelector((state) => state.contacts);
    const classes = useStyles();

    if (!contacts?.length && !isLoading) {
        return (
            <div className={classes.noContacts}>
                <Typography>No one has been added to your contacts yet.</Typography>
                <Button variant="contained" color="primary" size="large" fullWidth onClick={handleAddContact}><MdAdd />&nbsp;Add Contact</Button>
            </div>
        )
    }

    return (
        isLoading ? (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        ) : (
            <Grid container direction="column" justifyContent="center" alignItems="stretch">
                {searchQuery.length > 0 ? (
                    <>
                        {results?.map((contact) => (
                            <Grid item key={contact.id} xs={12} md={12}>
                                <Contact 
                                    handleEditContact={handleEditContact} 
                                    key={contact.id} currentId={currentId} setShowDeleteContact={setShowDeleteContact}
                                    nameAvatar={nameAvatar} contact={contact} setCurrentId={setCurrentId} 
                                />
                            </Grid>
                        ))}
                        {(results?.length === 0 && searchQuery.length !== 0) && (
                            <Typography variant="h4" color="error">No results found.</Typography>
                        )}
                    </>
                ) : (
                    <>
                        <Grid item xs={12} sm={12} md={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleAddContact}><MdAdd />&nbsp;Add Contact</Button>
                        </Grid>
                        {contacts.map((contact) => (
                            <Grid item key={contact.id} xs={12} md={12}>
                                <Contact 
                                    handleEditContact={handleEditContact} 
                                    key={contact.id} currentId={currentId} setShowDeleteContact={setShowDeleteContact}
                                    nameAvatar={nameAvatar} contact={contact} setCurrentId={setCurrentId} 
                                />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        )
    )
}

export default Contacts;
