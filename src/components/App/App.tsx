import { useState } from "react";
import css from "./App.module.css";
import { FaReact } from "react-icons/fa";

import type { Votes, VoteType } from "../../types/votes";
import { CafeInfo } from "../СafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  function handleVote(key: VoteType) {
    setVotes((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  }

  function resetVotes() {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}

      <div className={css.about}>
        <FaReact className={css.icon_react} />
      </div>
    </div>
  );
}

export default App;
