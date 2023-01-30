import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { resetMessage } from "../../../redux/slices/messageInfoSlice";
import { resetPetsMessage } from "../../../redux/slices/petsSlice";
import { resetUserMessage } from "../../../redux/slices/userSlice";
import { resetContactUsMessage } from "../../../redux/slices/contactUsSlice";

const MessageInfoDialog = (props) => {

    const messageState = useSelector((state) => state.messages.message);
    const petsMessageState = useSelector((state) => state.pets.message);
    const usersMessageState = useSelector((state) => state.users.message);
    const contactUsState = useSelector((state) => state.contactUs.message);

    const dispatch = useDispatch();

    const getMessageData = () => {
        if (messageState)
            return messageState;

        if (petsMessageState)
            return petsMessageState;

        if (usersMessageState)
            return usersMessageState;

        if (contactUsState)
            return contactUsState;
    }

    const getMessageDetailData = () => {
        const messageData = getMessageData();

        if (messageData && messageData.detailsData && messageData.detailsData.length) {
            const renderedDetails = messageData.detailsData.map((messageDetail, key) => {

                let detailName = null;
                let detailValue = null;

                for (const prop in messageDetail) {
                    detailName = prop
                    detailValue = messageDetail[prop]
                }

                return <li>
                    <strong>{detailName}: </strong>
                    <span>{detailValue}</span>
                </li>
            });

            return <Box sx={{ padding: "20px" }}>
                <strong>Detalles:</strong>
                <ul>
                    {renderedDetails}
                </ul>
            </Box>
        }

        return null;
    }

    const CloseDialog = () => {
        dispatch(resetMessage());
        dispatch(resetPetsMessage());
        dispatch(resetUserMessage());
        dispatch(resetContactUsMessage());
    }

    useEffect(() => {

    }, [messageState]);

    return (<Dialog
        open={getMessageData() != null}
        onClose={CloseDialog}
        aria-labelledby="message-dialog-title"
        aria-describedby="message-dialog-description"
    >
        <DialogTitle id="Message-dialog-title">
            {getMessageData() ? getMessageData().title : null}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="message-dialog-description">
                {getMessageData() ? getMessageData().message : null}
            </DialogContentText>
            {
                getMessageDetailData()
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={CloseDialog}>
                Aceptar
            </Button>
        </DialogActions>
    </Dialog>)
}

export default MessageInfoDialog;