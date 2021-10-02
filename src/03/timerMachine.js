import { createMachine, assign } from "xstate";

export const timerMachine = createMachine(
  {
    initial: "idle",
    context: {
      duration: 60,
      elapsed: 0,
      interval: 0.1,
    },
    states: {
      idle: {
        // Parameterize this action:
        entry: "reset",

        on: {
          TOGGLE: "running",
        },
      },
      running: {
        on: {
          // On the TICK event, the context.elapsed should be incremented by context.interval
          TICK: {
            actions: "tick",
          },

          TOGGLE: "paused",
          ADD_MINUTE: {
            // Parameterize this action:
            actions: "addMinute",
          },
        },
      },
      paused: {
        on: {
          TOGGLE: "running",
          RESET: "idle",
        },
      },
    },
  },
  {
    actions: {
      tick: assign({
        elapsed: (ctx) => ctx.elapsed + ctx.interval,
      }),
      addMinute: assign({
        duration: (ctx) => ctx.duration + 60,
      }),
      reset: assign({
        duration: 60,
        elapsed: 0,
      }),
    },
  }
);
