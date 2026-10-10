export default function Flower() {
  return <svg width="1em" height="1em" viewBox="0 0 64 64" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="6" strokeLinecap="round">{Array.from({ length: 8 }, (_, index) => <path key={index} d="M32 7V22" transform={`rotate(${index * 45} 32 32)`} />)}</g><circle cx="32" cy="32" r="3" fill="currentColor" /></svg>;
}
