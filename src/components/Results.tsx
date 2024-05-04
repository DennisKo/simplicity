'use client';

import { continueConversation } from '@/app/search/[query]/actions';
import { ClientMessage } from '@/types';
import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export const Results = ({ query }: { query: string }) => {
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  useEffect(() => {
    const getResponse = async () => {
      const message = await continueConversation(query);
      setConversation((currentConversation: ClientMessage[]) => [
        ...currentConversation,
        message,
      ]);
    };
    getResponse();
  }, []);

  return (
    <div className="flex flex-col">
      {conversation.map((message: ClientMessage) => (
        <div key={message.id}>
          {message.role === 'user' ? (
            <UserMessage message={message} />
          ) : (
            <AssistantMessage message={message} />
          )}
        </div>
      ))}
    </div>
  );
};

const AssistantMessage = ({ message }: { message: ClientMessage }) => {
  return (
    <div className="text-secondary-foreground  rounded-lg">
      {message.display}
    </div>
  );
};

const UserMessage = ({ message }: { message: ClientMessage }) => {
  return <div className="text-2xl">{message.display}</div>;
};
