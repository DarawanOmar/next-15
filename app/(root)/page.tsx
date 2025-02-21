import ShinyText from "@/components/layout/shiny-text";

export default function Home() {
  // Push
  return (
    <div className="h-screen flex justify-center items-center ">
      <ShinyText
        text="بەخێربێن بۆ شکار ڕێستوڕانت"
        className="text-2xl sm:text-4xl  "
      />
    </div>
  );
}
