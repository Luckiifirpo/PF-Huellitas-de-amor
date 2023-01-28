import { CircularProgress, Modal, Paper } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BusyModeCircularProgressIndicator = (props) => {

    const contactUsBusyMode = useSelector((state) => state.contactUs.isBusy);
    const petsBusyMode = useSelector((state) => state.pets.isBusy);
    const usersBusyMode = useSelector((state) => state.users.isBusy);
    const adoptionsBusyMode = useSelector((state) => state.adoptions.isBusy);

    const isBusy = () => {
        return contactUsBusyMode || petsBusyMode || usersBusyMode || adoptionsBusyMode;
    }

    useEffect(() => {

    }, [contactUsBusyMode, petsBusyMode, usersBusyMode, adoptionsBusyMode]);

    return <Modal open={isBusy()} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Paper sx={{
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
            <CircularProgress />
        </Paper>
    </Modal>
}

export default BusyModeCircularProgressIndicator;