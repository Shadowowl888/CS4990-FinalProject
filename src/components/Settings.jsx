import { Container, TextField, Typography } from "@mui/material";

const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} maxWidth="sm">
                <Typography variant="h1">CaddieAI</Typography>
                <br />

                <Container sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography>I want to see a planned hole of golf for each shot at hole</Typography>
                    <TextField id="standard-basic" label="Category" variant="standard" sx={{
                        paddingBottom: "1.5vh",
                        marginLeft: "0.5vw",
                    }}/>
                </Container>

                <Container sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography>Par:</Typography>
                    <TextField id="standard-basic" label="Quantifier" variant="standard" sx={{
                        paddingBottom: "1.5vh",
                        marginLeft: "0.5vw",
                    }}/>
                </Container>

                <Container sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography>Yardage Distance:</Typography>
                    <TextField id="standard-basic" label="Quantifier" variant="standard" sx={{
                        paddingBottom: "1.5vh",
                        marginLeft: "0.5vw",
                    }}/>
                </Container>

                <Container sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography>Wind Speed and Direction:</Typography>
                    <TextField id="standard-basic" label="Quantifier" variant="standard" sx={{
                        paddingBottom: "1.5vh",
                        marginLeft: "0.5vw",
                    }}/>
                </Container>
            </Container>
        </div>
    );
};

export default Settings;