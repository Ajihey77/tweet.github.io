
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/router";

interface CForm{
  text: string;
};

export default() => {
  const {
    register,
    handleSubmit
  } = useForm<CForm>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onvalid = async (data: CForm) => {
    if (!loading) {
      setLoading(true);
      const request = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (request.status !== 405) {
        router.push("/");
      }            

      if (request.status === 201) {
        alert("트윗 업로드 성공!");
      }
      setLoading(false);
    }
  };

  return(
    <div className="bg-black w-full h-screen grid grid-cols-4">
      <div className="h-screen">
        <div className='flex flex-col gap-5 mt-20'>
          <button className='text-white text-xl font-extrabold text-left ml-8'># 트윗 작성하기</button>
          <button className='text-white text-xl font-extrabold text-left ml-8'># 탐색하기</button>
          <button className='text-white text-xl font-extrabold text-left ml-8'># 설정</button>
        </div>
      </div>
      <div className="h-screen border-[0.1px] border-gray-400 col-span-2 border-opacity-50">
        <div className=" border-gray-400 border-b-[0.1px] border-opacity-50">
        </div>
        <div className='py-3'>
          <div className=''>
            <form onSubmit={handleSubmit(onvalid)}>
              <div className="flex flex-col items-end space-y-5 mr-10">
                <button className="bg-blue-600 text-white px-5 rounded-3xl py-2 font-bold hover:bg-slate-400">트윗</button>
              </div>
              <div className="flex flex-col items-center mt-2">       
                <input 
                  className='py-4 px-2 w-[500px] h-44 opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400' 
                  placeholder="내용을 입력하세요."
                  type="text"
                  {...register("text", { required: "내용을 입력하세요!!"})}
                />
              </div>
            </form>
          </div>
        </div>
        
      </div>
      <div className="h-screen">
      </div>
    </div>    
  );
}