import Link from "next/link";
export default function Home() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Welcome to Jackpot Frontend</h1>
        <p>Please <Link href="/login">login</Link> or <Link href="/register">register</Link> (via a parent user’s token) to continue.</p>
      </div>
    );
  }
  