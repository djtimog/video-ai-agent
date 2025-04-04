import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      welome to timogs's page
      <Link href="/dashboard">
      <br/>dashboard</Link>
    </div>
  );
}
