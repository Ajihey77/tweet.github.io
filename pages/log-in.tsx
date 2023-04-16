import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface TForm {
  email: string;
}

export default() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TForm>();
  const [loading, setLoading] = useState(false);
  const [mes, setMes] = useState("");
  const router = useRouter();
  const onvalid = async (data: TForm) => {
    if (!loading) {
      console.log(data)
      const request = await fetch("/api/user/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      console.log(request.status)
      if (request.status === 404) {
        setMes("가입하지 않은 사용자 입니다.");
      }
      if (request.status === 200) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  };

  return(
    <div className="bg-black w-full h-screen">
        {/* logo */}
        <div></div>

        <div className="flex justify-center mb-[35px]">
          <span className="text-white font-extrabold text-3xl">트위터에 로그인하기</span>
        </div>

        <div className="flex flex-col items-center space-y-5">
          <button className="bg-white rounded-3xl w-[285px] py-2"> <span className='font-bold'>Google</span> 계정으로 로그인</button>
          <button className="bg-white rounded-3xl w-[285px] py-2"> <span className='font-bold'>Apple로</span> 로그인하기</button>
        </div>

        <form onSubmit={handleSubmit(onvalid)}>
          <div className="flex flex-col items-center mb-[25px]">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-[270px] h-px my-5 opacity-50 bg-gray-400  "/>
              <span className="absolute px-3 font-medium text-white -translate-x-1/2 bg-black left-1/2">또는</span>
            </div>          
            <input 
              className='py-4 px-2 w-[285px] opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400' 
              placeholder="이메일 주소 또는 사용..."
              type="email"
              {...register("email", { required: "이메일을 입력하세요!!"})}
            />
            <span className='text-red-600 mt-3 -mb-2' >{errors?.email?.message}{mes}</span>
          </div>

          <div className="flex flex-col items-center space-y-5">
            <button className="bg-white rounded-3xl w-[285px] py-2 font-bold hover:bg-slate-400">다음</button>
            <button className="bg-black text-white border-[0.1px] border-gray-400 rounded-3xl w-[285px] py-2 font-bold">비밀번호를 잊으셨나요?</button>
          </div>
          <div className="flex flex-row justify-center mt-14 -ml-20">
            <span className="text-gray-400 opacity-50">계정이 없으신가요?</span>
            <a href="/create-account" className="text-blue-600 hover:text-blue-300 ">가입하기</a>
          </div>
        </form>
    </div>
  );
}