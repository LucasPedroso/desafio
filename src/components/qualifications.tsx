"use client";
import { APIProfissional } from "@/app/api/profissional/route";
import { Qualificacao } from "@/app/api/qualificacao/route";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Qualification } from "@prisma/client";
import { useEffect, useState } from "react";

const fetchQualifications = async () => {
  const response = await fetch("http://localhost:3000/api/qualificacao", {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
};

export default function Qualifications({
  qualifications,
}: {
  qualifications: APIProfissional["qualifications"];
}) {
  const [qualificationsOptions, setQualificationsOptions] = useState<
    Qualificacao[]
  >([{ qualificationId: "1", name: "Qualificacao" }]);

  useEffect(() => {
    const fetchQualifications = async () => {
      await fetch("http://localhost:3000/api/qualificacao", {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => setQualificationsOptions(data));
    };
    fetchQualifications();
  }, []);

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={qualificationsOptions?.map(
          (qualificacao: Qualification) => qualificacao.name,
        )}
        defaultValue={qualifications.map((option) => {
          return option.name;
        })}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            return (
              <div key={option}>
                <input type="hidden" value={option} name="qualification" />
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                ></Chip>
              </div>
            );
          })
        }
        renderInput={(params) => (
          <TextField
            name="qual"
            {...params}
            variant="outlined"
            label="Qualificações"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
