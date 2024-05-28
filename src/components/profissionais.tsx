"use client";
import { APIProfissional } from "@/app/api/profissional/route";
import { Button, Grid, Input, InputLabel, Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterInputValueProps,
  GridFilterOperator,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useImperativeHandle, useRef } from "react";
import ChipsQualifications from "./chipsQualifications";
import OnlyAdminOrBlank from "./onlyAdminOrBlank";
import { SubmitButton } from "./submitButton";

export default function Profissionais({
  profissionais,
}: {
  profissionais: APIProfissional[];
}) {
  const router = useRouter();

  const QualificationsInputValue = (props: GridFilterInputValueProps) => {
    const { item, applyValue, focusElementRef } = props;

    const inputRef: React.Ref<any> = useRef(null);
    useImperativeHandle(focusElementRef, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      applyValue({ ...item, value: event.target.value });
    };

    return (
      <>
        <InputLabel shrink focused htmlFor="input-with-icon-adornment">
          Value
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          className="w-full h-full "
          type="text"
          value={item.value}
          onChange={handleFilterChange}
          ref={inputRef}
        />
      </>
    );
  };

  const qualificationsFilterOperators: GridFilterOperator<
    any,
    { qualificationId: string; name: string }[]
  >[] = [
    {
      label: "Contains",
      value: "contains",
      getApplyFilterFn: (filterItem) => {
        if (!filterItem.field || !filterItem.value || !filterItem.operator) {
          return null;
        }

        return (value) => {
          return value.some((x) =>
            x.name.toLowerCase().includes(filterItem.value.toLowerCase()),
          );
        };
      },
      InputComponent: QualificationsInputValue,
      InputComponentProps: { type: "text" },
      getValueAsString: (value) => value,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (value, row) => row.user.name,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: function vg(value, row: APIProfissional) {
        return row.user.email;
      },
    },
    {
      field: "qualifications",
      headerName: "Qualifications",
      width: 500,

      renderCell: (params: { row: APIProfissional }) => {
        return (
          <ChipsQualifications qualifications={params.row.qualifications} />
        );
      },
      filterOperators: qualificationsFilterOperators,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      editable: false,
      type: "actions",
      width: 100,
      renderCell: (params) => {
        return (
          <OnlyAdminOrBlank>
            <SubmitButton
              text="Editar"
              onClick={() => {
                router.push(`/profissional/${params.row.professionalId}`);
              }}
            />
          </OnlyAdminOrBlank>
        );
      },
    },
  ];

  return (
    <>
      <Grid container spacing={2} px={0}>
        <Grid item xs={12} px={0}>
          <Paper elevation={3}>
            <Grid item xs={12} p={2}>
              <Link href="/profissional/novo">
                <Button variant="outlined">Cadastrar Profissional</Button>
              </Link>
            </Grid>
            <Grid container spacing={2} px={2} pb={2}>
              <Grid item xs={12}>
                <DataGrid
                  rows={profissionais}
                  columns={columns}
                  getRowId={function getRowId(row: APIProfissional) {
                    return row.user.userId;
                  }}
                  autosizeOptions={{ includeOutliers: true }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
