import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Tweet } from '@prisma/client';

interface Response {
  ok: boolean;
  tweet: Tweet[];
}

export default () => {
  const router = useRouter();
  console.log(router.query.id);
  const { data } = useSWR<Response>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  console.log(data);
    return(
    <div className="bg-black w-full h-screen grid grid-cols-4">
      <div className="h-screen">
        <div className='flex flex-col gap-5 mt-20'>
          <button className='bg-blue-600 hover:bg-blue-300 rounded-full w-44 py-2 pl-2 text-white text-xl font-extrabold text-left ml-8'><a href="/create-tweet"># 트윗 작성하기</a></button>
          <button className='text-white text-xl font-extrabold text-left ml-8'># 탐색하기</button>
          <button className='text-white text-xl font-extrabold text-left ml-8'># 설정</button>
        </div>
      </div>
      <div className="h-screen border-[0.1px] border-gray-400 col-span-2 border-opacity-50">
        <div className=" border-gray-400 border-b-[0.1px] border-opacity-50">
          <div className='flex flex-row justify-between mt-1 mb-3'>
            <button className='text-white text-2xl ml-3'>←</button>
            <div className='bg-gray-600 rounded-3xl w-4/6 py-2 opacity-40'>
              <span></span>
              <input className='bg-gray-600 ml-9' placeholder='트위터 검색'/>
            </div>
            <button className='text-white text-2xl mr-3'>⋅⋅⋅</button>
          </div>

        </div>
        <div className='mt-4'>
            <div className='bg-gray-300 rounded-full w-32 h-32 mx-auto'></div>
            <span className="text-gray-400 text-xl ml-2 flex justify-center">id:{router.query.id}</span>
          </div>
        {data
          ? data?.tweet?.map((t) => (
        <div className='grid grid-cols-6 border-b-[0.1px] border-gray-400 border-opacity-50 py-10 '>
          <div className=''>
            <div className='bg-gray-300 rounded-full w-20 h-20 mx-auto'></div>
          </div>
          <div className='col-span-5'>
            <div>
              <span className="text-white"></span>
              <span className="text-gray-400 text-xs ml-2">id:{t.userId}</span>
            </div>
            <span className="text-white">{t.text}</span>
            <div className="flex space-x-0.5 text-sm  text-gray-400 justify-end mr-32">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
          </div>
          </div>
        </div>
          )): "로딩중"}
      </div>
      <div className="h-screen">
      </div>
    </div>
  );
}
