import { useRouter } from "next/router";
import React from "react";
import PrevBtn from "../../public/images/appointment/prev-btn.png";
import NextBtn from "../../public/images/appointment/next-btn.png";
import Image from "next/image";
import Link from "next/link";

interface IHandlePageProps {
  prevRoute?: string;
  nextRoute: string;
}

const HandlePage: React.FC<IHandlePageProps> = ({ prevRoute, nextRoute }) => {
  if (!prevRoute) {
    return (
      <div className="flex w-full justify-end mt-12">
        <Link href={`/appointment/${nextRoute}`}>
          <a>
            <button className="w-20 h-20">
              <Image
                id="next"
                src={NextBtn}
                alt="next-btn"
                layout="responsive"
              />
            </button>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-between mt-12">
      <Link href={`/appointment/${prevRoute}`}>
        <a></a>
      </Link>
      <Link href={`/appointment/${nextRoute}`}>
        <a></a>
      </Link>
    </div>
  );
};

export default HandlePage;
