"use client";
import { Fragment, memo } from "react";
import { getUserInfo } from "@/apis/userProfile";
import { UserType } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

function ProfileInfo() {
  const { data } = useQuery<Partial<UserType>>({
    queryKey: ["user/info"],
    queryFn: getUserInfo,
  });

  return (
    <div>
      {data ? (
        <Fragment>
          <h2 className="text-xl font-bold text-gray-900">{data.userName}</h2>
          <p className="text-sm text-gray-600">가입일: 2024.01.15</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-[#ffd964]">
              {"★".repeat(data.recommend)}
            </div>
            <span className="text-sm text-gray-600">(4.8)</span>
          </div>
        </Fragment>
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(ProfileInfo);
