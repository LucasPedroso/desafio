import { APIProfissional } from "@/app/api/profissional/route";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

type ChipData = APIProfissional["qualifications"][0];

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsQualifications({
  qualifications,
}: {
  qualifications: ChipData[];
}) {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {qualifications.map((data) => {
        let icon;

        return (
          <ListItem
            key={data.qualificationId}
            sx={{ height: "100%", alignItems: "center", display: "flex" }}
          >
            <Chip icon={icon} label={data.name} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
