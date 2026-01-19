import { Box, Stack, Chip, Typography } from "@mui/material"

type Props = { userName: string, score: number, index: number }
const SetTopScores = (props: Props) => {

  return(
    <Box
      key={props.userName}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          size="small"
          label={`#${props.index + 1}`}
          color={props.index === 0 ? "warning" : "default"}
        />
        <Typography variant="body2">
          {props.userName}
        </Typography>
      </Stack>

      <Typography variant="body2" fontWeight={500}>
        {props.score}
      </Typography>
    </Box>
  )
}

export default SetTopScores;