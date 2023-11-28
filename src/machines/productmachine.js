import { createMachine, assign } from "xstate";
const productsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7CBXAxgF1gDoBLCAGzAGIAxAUQBUBhACQG0AGAXURXVmLzF0AOx4gAHogCMADgDMhAGwBWGTOVTFAJjnLdmgDQgAnoi2KphLQHYtUuQE5rc9YuvyAvh6NpMuAoRk6ACGEMTCUJQQImAkwgBu6ADWsb7Y+ERBoeFQCOGJOMGCIhycpWLIfAJCokgSZg4KUtaKACwurdYO6g7KRqYIMlqEqvYOrSpS7DIO7IpePhjpAVlhEZRgqBiohMhkRQBm6KgAtrtL-pkha7n56IXFwqXldZX8j2KSCFqNhDLt1lUtnY1main6Zi0ykIrT0Uh+bRk9g0CxAaUuhE220oACUGDiAJovXjvGqfRCtOaEJwqRS6TrsZpyCEIZqtalw8zKVoObq8rRebwgYSYOAVC4ZCpVD51L4AWlaMhZCsI1laUg0ak6rSh5gFQvRGRI5DAUtJInJCHYLLkcmsfwmLlBbIcNlRhpW1xyZuqFtlFK0LI1ll6cnsshU7Dk5ms7olAVguBwcHgr2lZP9CE1SmU2lzjm5dL6Jmk7GGWi51jLtjcejjfiNWOOPploC+2dpULpvUdxYGWnVDrpMmdatdtkFHiAA */
    id: "products",
    initial: "idle",
    context: {
      data: null,
      error: null,
    },
    states: {
      idle: {
        on: { FETCH: "loading" },
      },
      loading: {
        invoke: {
          src: "fetchProductsData",
          onDone: {
            target: "success",
            actions: assign({
              data: (_, event) => event.data,
              error: null, // Clear error on successful fetch
            }),
          },
          onError: {
            target: "error",
            actions: assign({
              error: (_, event) => event.data,
            }),
          },
        },
      },
      success: {
        type: "final",
      },
      error: {
        on: {
          RETRY: "loading",
        },
      },
    },
  },

  {
    services: {
      fetchProductsData: async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
      },
    },
  }
);
export default productsMachine;
