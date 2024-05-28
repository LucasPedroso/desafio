"use client";
import { CurrenteStatePure } from "@/lib/actions/actions";
import { Alert, Chip, Paper, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Qualification } from "@prisma/client";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function HistoryEdit({
  profissionais,
}: {
  profissionais: CurrenteStatePure[];
}) {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (value, row: CurrenteStatePure) => row.data?.user.name,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: function vg(value, row: CurrenteStatePure) {
        return row.data?.user.email;
      },
    },
    {
      field: "qualifications",
      headerName: "Qualifications",
      width: 500,

      renderCell: (params) => {
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
            {params.row.data?.qualifications.map((data: Qualification) => {
              return (
                <ListItem
                  key={data.qualificationId}
                  sx={{ height: "100%", alignItems: "center", display: "flex" }}
                >
                  <Chip label={data.name} />
                </ListItem>
              );
            })}
          </Paper>
        );
      },
    },
  ];

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        Este histórico só estará disponível enquanto estiver editando o
        profissional
      </Alert>
      <DataGrid
        rows={profissionais}
        columns={columns}
        getRowId={function getRowId(row: CurrenteStatePure) {
          return (
            row?.data?.professionalId! +
            row?.data?.qualifications[0].qualificationId +
            row?.data?.qualifications.length
          );
        }}
        autosizeOptions={{ includeOutliers: true }}
      />
    </>
  );
}
