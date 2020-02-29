export const getSessionSecret = () => {
  return process.env.SESSION_SECRET || "aslkdfjoiq12312";
}