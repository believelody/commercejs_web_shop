import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    toolbar: theme.mixins.toolbar,
    layout: {
        marginTop: "5%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: "auto",
        [theme.breakpoints.up(600 + theme.spacing(2))]:  {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            marginTop: 60,
        },
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)] : {
            marginTop: theme.spacing(6),
            marginTBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    divider: {
        margin: "20px 0",
    },
    spinner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}))