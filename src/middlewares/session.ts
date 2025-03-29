import { Context, session as telegrafSession } from "telegraf";
import { SessionAdCreation } from "./types";


type Session = {
  adCreation: SessionAdCreation | null;
};

export const session = telegrafSession<Session, Context>({
  defaultSession(ctx) {
    return {
      adCreation: null,
    };
  },
});

