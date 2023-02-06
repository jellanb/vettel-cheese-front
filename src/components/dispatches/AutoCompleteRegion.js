import {Fragment} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";


export default function AutoCompleteRegion({newDispatch, setNewDispatch}) {
    const handleRegionSelected = (newValue) => {
        setNewDispatch({ ...newDispatch, region: newValue})
    }

    return (
        <Fragment>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={regions}
                onChange={async (event, newValue) => {
                    await handleRegionSelected(newValue.label);
                }}
                renderInput={(params) => <TextField {...params} label="Select región" />}
            />

        </Fragment>
    );
};

const regions = [
    {label: "Región de Arica y Parinacota.", id: 0},
    {label: "Región de Tarapacá.", id: 1},
    {label: "Región de Antofagasta.", id: 2},
    {label: "Región de Atacama.", id: 3},
    {label: "Región de Coquimbo.", id: 4},
    {label: "Región de Valparaíso.", id: 5},
    {label: "Región Metropolitana.", id: 6},
    {label: "Región de O’Higgins.", id: 7},
    {label: "Región del Maule.", id: 8},
    {label: "Región del Ñuble.", id: 9},
    {label: "Región del Biobío.", id: 10},
    {label: "Región de La Araucanía.", id: 11},
    {label: "Región de Los Ríos.", id: 11},
    {label: "Región de Los Lagos.", id: 11},
    {label: "Región de Aysén.", id: 11},
    {label: "Región de Magallanes.", id: 11}
]