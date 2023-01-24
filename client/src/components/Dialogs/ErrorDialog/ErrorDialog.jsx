import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../../../redux/slices/errorsSlice";
import { resetPetsError } from "../../../redux/slices/petsSlice";
import { resetUserError } from "../../../redux/slices/userSlice";

const ErrorDialog = (props) => {
    const dispatch = useDispatch();
    const errorState = useSelector((state) => state.errors);
    const petErrorState = useSelector((state) => state.pets.errors);
    const userErrorState = useSelector((state) => state.users.errors);

    const CloseDialog = () => {
        if (errorState.error) {
            dispatch(resetError());
            return
        }

        if (petErrorState) {
            dispatch(resetPetsError());
            return
        }

        if (userErrorState) {
            dispatch(resetUserError());
            return
        }
    }

    const getErrorData = () => {
        if (errorState.error)
            return errorState.error;

        if (petErrorState)
            return petErrorState;

        if (userErrorState)
            return userErrorState;
    }

    const getErrorDetailData = () => {
        const errorData = getErrorData();

        if (errorData && errorData.detailsData && errorData.detailsData.length) {
            const renderedDetails = errorData.detailsData.map((errorDetail, key) => {

                let detailName = null;
                let detailValue = null;

                for (const prop in errorDetail) {
                    detailName = prop
                    detailValue = errorDetail[prop]
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

    useEffect(() => {

    }, [petErrorState, userErrorState]);

    return (<Dialog
        open={getErrorData() != null}
        onClose={CloseDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
    >
        <DialogTitle id="error-dialog-title">
            {getErrorData() ? getErrorData().title : null}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="error-dialog-description">
                {getErrorData() ? getErrorData().message : null}
            </DialogContentText>
            {
                getErrorDetailData()
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={CloseDialog}>
                Aceptar
            </Button>
        </DialogActions>
    </Dialog>)
}

export default ErrorDialog;