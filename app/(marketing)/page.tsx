import Heros from "./_components/Heros";
import Footer from "./_components/Footer";
import Heading from "./_components/Heading";

export default function Marketing() {
  return (
    <div className="dark:bg-[#1F1F1F] min-h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center md:justify-start gap-8 px-6 pb-10 text-center">
        <Heading />

        <Heros />
      </div>

      <Footer />
    </div>
  );
}
