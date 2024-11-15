export function Debug({ children }) {
  return <pre>{JSON.stringify(children, null, 4)}</pre>;
}
