import Image from "next/image";
import AuthForm from "../_component/authForm";
import login from "@/public/sign-in.jpg";

export default function SignIn() {
  return (
    <main className="w-full flex flex-col-reverse gap6 md:gap-0 md:flex-row overflowhidden h-svh rounded-t-lg max-md:bg-primary ">
      <section className="h-full w-full md:max-w-[50%] flex flex-col justify-center items-center  max-md:rounded-t-[50px] bgwhite rounded-t-xl bg-white dark:!bg-black">
        <aside className="flex flex-col gap-3 text-center ">
          <h1 className="text-card-foreground  text-2xl md:text-4xl font-sirwan_meduim ">
            چوونەژوورەوە
          </h1>
          <p className="text-card-foreground/50 font-medium font-sirwan_reguler">
            بەخێربێیت بە ئیمەیڵ و پاسۆردی خۆت بچۆرە ژوورەوە
          </p>
        </aside>
        <div className="w-full p-8 min-w-80 max-w-xl ">
          <AuthForm />
        </div>
      </section>
      <div className=" bg-primary  w-full">
        <Image
          src={login}
          alt="Login"
          className=" max-md:max-h-[300px] md:h-full w-full object-cover"
          priority
        />
      </div>
    </main>
  );
}
