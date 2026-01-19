import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  List,
  Paper,
} from "@mui/material";
import type { resultT } from "../../redux/api/gameResult";
import type { RowT } from "../../redux/api/gameApi";
import SetTopScores from "./SetTopScores";

/**
 * ResultsModal
 * Centered modal for displaying end-of-batch game results
 */

type Props = {
  open: boolean;
  onClose: () => void;
  HandleNext: () => void;
  HandleSubmit: () => void;
  results: resultT;
  data: RowT;
  isLastSet: boolean;
};

const mockTopScores = [
  { name: "Guest user 12", score: 92 },
  { name: "Alice", score: 87 },
  { name: "Guest user 3", score: 81 },
];

export default function ResultsModal({
  open,
  onClose,
  HandleNext,
  HandleSubmit,
  results,
  data,
  isLastSet,
}: Props) {
  const { score } = results;

  const {
    dataset: datasetName,
    n_total,
    n_seen,
    n_incl,
    n_incl_seen,
  } = data;

  const HandleSubmitAndNext = () => {
    HandleSubmit();
    HandleNext();
  }

  const HandleSubmitAndFinish = () => {
    HandleSubmit();
    onClose();
  }

  

  const missedItems = n_incl - n_incl_seen;
  const playerRank = 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Results – {datasetName}
      </DialogTitle>

      <DialogContent>
        <Paper elevation={0} sx={{ p: 2 }}>
          {/* Core stats */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mb={3}
          >
            <StatBlock label="Targets seen" value={`${n_seen} / ${n_total}`} />
            <StatBlock
              label="Targets found"
              value={`${n_incl_seen} / ${n_incl}`}
            />
            <StatBlock label="Score" value={score} emphasize />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Missed items */}
          <Section title="Missed items">
            {missedItems === 0 ? (
              <Typography variant="body2" color="text.secondary">
                None 🎉
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {missedItems}
              </Typography>
            )}
          </Section>

          {/* Leaderboard */}
          <Section title="Leaderboard">
            <List dense disablePadding>
              {mockTopScores.map((entry, idx) => (
                <SetTopScores
                  key={entry.name}
                  userName={entry.name}
                  score={entry.score}
                  index={idx}
                />
              ))}
            </List>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Your rank: {playerRank}
            </Typography>
          </Section>

          {/* Actions */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mt={3}
          >
            {isLastSet?
            <>
              <Button variant="outlined" fullWidth onClick={onClose}>
                Finish!
              </Button>
              <Button variant="contained" fullWidth onClick={HandleSubmitAndFinish}>
                Submit results & Finish
              </Button>
            </>:
            <>
              <Button variant="outlined" fullWidth onClick={HandleNext}>
                Next batch (don’t submit)
              </Button>
              <Button variant="contained" fullWidth onClick={HandleSubmitAndNext}>
                Submit results & next batch
              </Button>
            </>
            }
          </Stack>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper components                                                          */
/* -------------------------------------------------------------------------- */

type StatBlockProps = {
  label: string;
  value: React.ReactNode;
  emphasize?: boolean;
};

function StatBlock({ label, value, emphasize }: StatBlockProps) {
  return (
    <Box flex={1}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant={emphasize ? "h6" : "subtitle1"}>
        {value}
      </Typography>
    </Box>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <Box mb={3}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
