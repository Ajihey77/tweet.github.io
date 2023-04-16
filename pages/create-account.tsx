import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface CForm{
  username: string;
  email: string;
};

export default() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CForm>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onvalid = async (data: CForm) => {
    if (!loading) {
      setLoading(true);
      const request = await fetch("/api/user/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (request.status !== 405) {
        router.push("/log-in");
      }            
      if (request.status === 200) {
        alert("이미 존재하는 사용자 입니다.");
      }
      if (request.status === 201) {
        alert("계정 생성 성공! 당장 로그인 하세요");
      }
      setLoading(false);
    }
  };
  return(
    <div className="bg-black w-full h-screen">
      <div>
        <div>
          <span className='text-white font-extrabold text-3xl flex justify-center -ml-28 mb-6'>계정을 생성하세요</span>
        </div>
        <form onSubmit={handleSubmit(onvalid)}>
          <div className='flex flex-col items-center gap-5'>
            <input 
            className='py-3 px-2 w-[370px] opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400'
            placeholder="이름"
            type='text'
            {...register("username",{required:"이름을 입력해주세요."})}
            />
            <input 
            className='py-3 px-2 w-[370px] opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400'
            placeholder='이메일'
            type='email'
            {...register("email",{required:"이메일을 입력해주세요."})}/>
            <span className='text-red-600' >{errors?.username?.message}</span>
            <span className='text-red-600' >{errors?.email?.message}</span>
          </div>

          <div>
          <a href="#" className="text-blue-600 flex justify-center ml-56 mt-2 text-sm">마지막 단계입니다!</a>
          </div>

          <div className='flex flex-col items-center'>
            <span className="text-white font-extrabold text-sm -ml-80 mb-2">생년월일</span>
            <span className=" opacity-50 text-gray-400 text-xs w-[370px] mb-4">이 정보는 공개적으로 표시되지 않습니다.비지니스,반려동물 등 계정 주제에 상관없이 나의 연령을 확인하세요.</span>
            <div className='w-[370px]'>
              <select className='mr-3 py-3 px-2 w-[150px] opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400'>
                <option value="">월</option>
                <option value="1">1월</option>
                <option value="2">2월</option>
                <option value="3">3월</option>
                <option value="4">4월</option>
                <option value="5">5월</option>
                <option value="6">6월</option>
                <option value="7">7월</option>
                <option value="8">8월</option>
                <option value="9">9월</option>
                <option value="10">10월</option>
                <option value="11">11월</option>
                <option value="12">12월</option>
              </select>

              <select className='mr-3 marker:w-[100px] py-3 px-2 opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400'>
                <option value="">일</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>

              <select className='mr-3 w-[120px] py-3 px-2 opacity-50 text-gray-400 bg-black border-[0.1px] rounded-md border-gray-400'>
                <option value="">년</option>
                  <option value="1">1월</option>           
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-white rounded-3xl w-[285px] py-2 font-bold hover:bg-slate-400">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
}