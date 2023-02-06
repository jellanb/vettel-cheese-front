import {Fragment} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import {allRegions} from "../../helpers/CommunesOfChile";


export default function AutoCompleteCommune({newDispatch, setNewDispatch}) {
    const handleRegionSelected = (newValue) => {
        setNewDispatch({ ...newDispatch, commune: newValue})
    }

    const communes = allRegions();

    return (
        <Fragment>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={communes}
                onChange={async (event, newValue) => {
                    await handleRegionSelected(newValue.label);
                }}
                renderInput={(params) => <TextField {...params} label="Select Commune" />}
            />
        </Fragment>
    )
}
