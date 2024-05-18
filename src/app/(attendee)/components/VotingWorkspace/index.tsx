import { useWorkspaceContext } from "../../contexts/WorkspaceContext";
import { type Award, type Demo } from "@prisma/client";

import AwardVoteSelect from "./AwardVoteSelect";
import { type VoteByAwardId, useVotes } from "./hooks/useVotes";

export default function VotingWorkspace() {
  const { currentEvent, event, attendee } = useWorkspaceContext();
  const { votes, setVote } = useVotes(currentEvent.id, attendee);

  if (!event) return null;

  return (
    <div className="absolute bottom-0 max-h-[calc(100dvh-120px)] w-full max-w-xl">
      <div className="flex size-full flex-col items-center justify-center gap-4 p-4">
        <div>
          <h1 className="text-center font-kallisto text-4xl font-bold tracking-tight">
            Voting Time! 🗳️
          </h1>
          <p className="text-md max-w-[330px] pt-2 text-center font-medium leading-5 text-gray-500">
            Who gets immortalized in the hall of fame? You decide! Note that you
            can only vote for each demoist once so choose wisely!
          </p>
        </div>
        <div className="flex w-full flex-col gap-8">
          {event.awards.map((award) => (
            <AwardVoteItem
              key={award.id}
              award={award}
              demos={event.demos}
              votes={votes}
              setVote={setVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AwardVoteItem({
  award,
  demos,
  votes,
  setVote,
}: {
  award: Award;
  demos: Demo[];
  votes: VoteByAwardId;
  setVote: (awardId: string, demoId: string | null) => void;
}) {
  return (
    <div className="flex flex-col font-medium">
      <h2 className="text-2xl font-bold">{award.name}</h2>
      <p className="text-md pb-2 pl-[2px] text-lg font-semibold italic leading-6 text-gray-500">
        {award.description}
      </p>
      <AwardVoteSelect
        award={award}
        demos={demos}
        votes={votes}
        onSelect={setVote}
      />
    </div>
  );
}
