import { auth } from "@/auth";
import { Avatar, Grid, Typography } from "@mui/material";

const UserCard = async () => {
  const session = await auth();

  return (
    <Grid container direction="column" alignItems="center" spacing={2} p={2}>
      <Grid item>
        <Avatar
          alt="User Avatar"
          src="https://picsum.photos/200/300"
          sx={{ width: 100, height: 100 }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="div">
          {`Hello, ${session?.user?.name}!`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" component="div">
          Email: {session?.user?.email}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" component="div">
          Role: {session?.user?.role}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserCard;
