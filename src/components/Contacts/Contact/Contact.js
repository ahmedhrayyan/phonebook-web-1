import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteContact } from "../../../actions/contacts";
import { Avatar, Button, Typography } from '@material-ui/core';
import useStyles from './styles';

const Contact = (props) => {
    const { contact, setCurrentId, nameAvatar, currentId, handleEditContact } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    const { phones } = useSelector((state) => state.phones);
    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones?.filter(phone => phone.id !== deletedPhones);

    return (
        <div onClick={() => setCurrentId(contact.id)} className={currentId === contact.id ? `${classes.activeContact} contact` : 'contact'}>
            <Avatar {...nameAvatar(contact?.name || contact?.email)} className={classes.avatar} />
            <div style={{width: "60%"}}>
                <Typography variant="h3" className={classes.name}>{`${contact?.name}` || `${contact?.email}`}</Typography>
                {(contactPhones) ? contactPhones[0]?.value : contact?.email}
            </div>
            <div style={{display: 'flex'}}>
                <button className={`${classes.iconE} contact-icon`} onClick={handleEditContact} color="primary" ><MdModeEdit /></button>
                <button className={`${classes.iconD} contact-icon`} onClick={() => {dispatch(deleteContact(contact.id)); setCurrentId(0)}} ><MdDelete /></button>
            </div>
        </div>
    )
};

export default Contact;
