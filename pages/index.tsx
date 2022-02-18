import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/appointment/select-treatment">
        <a>
          <button>예약</button>
        </a>
      </Link>
    </div>
  );
};

export default Home;
